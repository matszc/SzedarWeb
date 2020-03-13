import React from "react";
import {api, gameTypes, tournamentTypes} from '../../config';
import SzedarTable from "../../components/tables/SzedarTable";
import WrapperCard from "../../components/cards/wrapperCard";
import moment from "moment";
import AppContext from "../../context/appContext";

const columns = [{
    id: 'name',
    label: 'Name',
    format: value => value.toLocaleString(),
}, {
    id: 'type',
    label: 'Type',
    format: value => value.toLocaleString(),
}, {
    id: 'creationDate',
    label: 'Start date',
    format: value => value.toLocaleString(),
}, {
    id: 'players',
    label: 'Players',
    format: value => value.toLocaleString(),
}, {
    id: 'gameType',
    label: 'Game',
    format: value => value.toLocaleString(),
}];

class BrowseTournamentsComponent extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            tournamentList: [],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        api.get('/tournament/GetAll').then(r => {
            const tournamentList = r.data.map(t => {
                const date = new Date(t.creationDate);
                date.setHours(date.getHours() + 1);

                const startDate = new Date(t.startDate);
                startDate.setHours(startDate.getHours() + 1);

                const players = t.maxNumberOfPlayers > 0 ? (`${t.numberOfPlayers} / ${t.maxNumberOfPlayers}`)
                    : t.numberOfPlayers.toString();
                return {
                    ...t,
                    creationDate: date.getTime() >= startDate.getTime() ? moment(date).format('DD-MM-YYYY HH:mm')
                        : moment(startDate).format('DD-MM-YYYY HH:mm'),
                    type: tournamentTypes(t.type),
                    gameType: date.getTime() >= startDate.getTime() ? '' : gameTypes(t.gameType),
                    players: players,
                }
            });
            this.setState((prevState) => ({
                ...prevState,
                tournamentList: tournamentList,
            }));
        })
            .catch(() => {
                this.context.snack.setSnack('error', 'You need to create account first');
            })
    };

    rowClick = ({id, type, open}) => {
        if (open) {
            this.props.history.push(`/browse/tournament/${id}`);
            return;
        }
        switch (type) {
            case 'Swiss': {
                this.props.history.push(`browse/swiss/${id}`);
                break;
            }
            case 'SingleElimination': {
                this.props.history.push(`browse/single/${id}`);
                break;
            }
            case 'DoubleElimination': {
                this.props.history.push(`browse/double/${id}`);
                break;
            }
            default: {

            }
        }
    };

    startClick = ({id}) => {
        api.post(`/tournament/start/${id}`, {}).then(() => {
            this.loadData();
        });
    };

    deleteClick = ({id}) => {
        api.delete(`/tournament/deleteOpenTournament/${id}`).then(() => {
            this.context.snack.setSnack('success', 'Tournament deleted');
            this.setState(prevState => ({
                ...prevState,
                tournamentList: prevState.tournamentList.filter(i => i.id !== id),
            }))
        })
            .catch(() => {
                this.context.snack.setSnack('error', 'Error during tournament delete');
            })
    };

    render() {
        return (
            <>
                <WrapperCard maxWidth={'md'} title={'Browse your tournaments'}>
                    <SzedarTable data={this.state.tournamentList} rowClick={this.rowClick} columns={columns}
                                 startClick={this.startClick} deleteClick={this.deleteClick} paginator/>
                </WrapperCard>
            </>
        )
    }
}

export default BrowseTournamentsComponent;
