import * as React from "react";
import api from "../../config";
import WrapperCard from "../../components/cards/wrapperCard";
import SzedarTable from "../../components/tables/SzedarTable";
import SzedarTabs from "../../components/tabs/szeadrTabs";
import SwissRound from "../../components/tables/swissRound";
import AddResultDialog from "../../components/dialogs/AddResultDialog/AddResultDialog";
import Button from "@material-ui/core/Button";
import style from "./swiss.module.scss"

const columns = [{
    id: 'position',
    label: 'Pos',
    format: v => v.toLocaleString(),
}, {
    id: 'player',
    label: 'Name',
    format: v => v.toLocaleString(),
}, {
    id: 'matchesWon',
    label: 'Wins',
    format: v => v.toLocaleString(),
}, {
    id: 'matchesLost',
    label: 'Loses',
    format: v => v.toLocaleString(),
}, {
    id: 'winRatio',
    label: 'Wins / Loses',
    format: v => v.toLocaleString(),
}, {
    id: 't1',
    label: 'T1',
    format: v => v.toLocaleString(),
}, {
    id: 't2',
    label: 'T2',
    format: v => v.toLocaleString(),
}, {
    id: 't3',
    label: 'T3',
    format: v => v.toLocaleString(),
}, {
    id: 'points',
    label: 'Points',
    format: v => v.toLocaleString(),
}];


export class Swiss extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            swissTable: [],
            rounds: [],
            numberOfRounds: [],
            ownerId: '',
            selectedTab: 0,
            dialog: {
                open: false,
                data: {},
            },
            userId: '',
        }
    }

    componentDidMount() {
        this.loadData();
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState(prevState => ({
            ...prevState,
            userId: user.id,
        }));
    }

    loadData = () => {
        api.get(`/swiss/${this.props.match.params.id}`).then(r => {
            const roundArray = [];
            for (let i = 1; i <= r.data.numberOfRounds; i++) {
                roundArray.push(i);
            }
            const swissTable = r.data.swissTable.map(r => ({
                ...r,
                winRatio: `${r.wins} / ${r.losses}`
            }));
            this.setState(prevState => ({
                ...prevState,
                swissTable: swissTable,
                rounds: r.data.rounds,
                numberOfRounds: roundArray,
                ownerId: r.data.ownerId,
            }));
        }).catch((r) => {
            //TODO show snack on error
            console.error(r.data)
        })
    };

    handleTabChange = (e, newValue) => {
        this.setState(prevState => ({
            ...prevState,
            selectedTab: newValue,
        }))
    };

    handleScoreSubmit = (e) => {
        e.preventDefault();
        const data = {
            Id: this.state.dialog.data.id,
            Player1Score: parseInt(e.target[0].value, 10),
            Player2Score: parseInt(e.target[1].value, 10),
            Player1: this.state.dialog.data.player1,
            Player2: this.state.dialog.data.player2,
        };

        api.patch(`/swiss/match/${this.state.dialog.data.id}`, data)
            .then(() => {
                this.loadData();
                this.setState(prevState => ({
                    ...prevState,
                    dialog: {
                        ...prevState.dialog,
                        open: false,
                    }
                }))
            })
    };

    handleRoundClick = (data) => {
        if (this.state.userId === this.state.ownerId && data.editAble) {
            this.setState(prevState => ({
                ...prevState,
                dialog: {
                    open: true,
                    data: data,
                }
            }))
        }
    };

    handleCloseDialog = () => {
        this.setState(prevState => ({
            ...prevState,
            dialog: {
                open: false,
                data: {},
            }
        }))
    };

    createNextRound = () => {
        api.post(`/swiss/round/${this.props.match.params.id}`, {}).then(() => {
            this.loadData();
            this.setState(prevState => ({
                ...prevState,
                selectedTab: prevState.selectedTab + 1,
            }));
        })
    };

    render() {
        return (
            <>
                <WrapperCard maxWidth={'lg'} title={'Swiss'}>
                    <SzedarTable data={this.state.swissTable} columns={columns}/>
                    <div className={style.tabsWrapper}>
                        <SzedarTabs currentRound={this.state.rounds.length}
                                    tabs={this.state.numberOfRounds}
                                    onChange={this.handleTabChange}
                                    value={this.state.selectedTab}/>
                        {this.state.ownerId === this.state.userId ?
                            <Button color={"primary"} onClick={this.createNextRound}>Create next round</Button>
                            : null}
                    </div>
                    <SwissRound
                        data={this.state.rounds[this.state.selectedTab] ? this.state.rounds[this.state.selectedTab].matchDtos : []}
                        click={this.handleRoundClick}/>
                    T1 - number of your opponents wins<br/>
                    T2 - number of your opponents T1s<br/>
                    T3 - difference between your small matches win and lost<br/>
                </WrapperCard>
                <AddResultDialog open={this.state.dialog.open}
                                 data={this.state.dialog.data}
                                 handleSubmit={this.handleScoreSubmit}
                                 handleClose={this.handleCloseDialog}
                />
            </>
        )
    }

}
