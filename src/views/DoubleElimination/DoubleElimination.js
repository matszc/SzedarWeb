import * as React from "react";
import api from "../../config";
import style from "../../components/bracket/bracket.module.scss";
import AddResultDialog from "../../components/dialogs/AddResultDialog/AddResultDialog";
import Bracket from "../../components/bracket/bracket";

export class DoubleElimination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            upper: undefined,
            lower: undefined,
            final: undefined,
            dialog: {
                open: false,
                data: {},
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        api.get(`/doubleElimination/${this.props.match.params.id}`).then(({data}) => {
            const finalMatchesFilter = data.filter(({matchCode}) => matchCode !== 'Final1' && matchCode !== 'Final2');
            const final = data.filter(({matchCode}) => matchCode === 'Final1' || matchCode === 'Final2');

            const upperMatches = finalMatchesFilter.filter(({matchCode}) => matchCode[matchCode.length - 1] !== 'L')
                .sort((a, b) => {
                    return (a.matchCode < b.matchCode) ? -1 : (a.matchCode > b.matchCode) ? 1 : 0;
                });

            const lowerMatches = finalMatchesFilter.filter(({matchCode}) => matchCode[matchCode.length - 1] === 'L')
                .sort((a, b) => {
                    return (a.matchCode < b.matchCode) ? -1 : (a.matchCode > b.matchCode) ? 1 : 0;
                });

            this.setState(prevState => ({
                ...prevState,
                upper: upperMatches,
                lower: lowerMatches,
                final: final,
            }));
        })
    };

    handleGameSelect = (data) => {
        if (!data.editAble) {
            return;
        }
        this.setState(prevState => ({
            ...prevState,
            dialog: {
                open: true,
                data: data,
            }
        }))
    };

    handleDialogClose = () => {
        this.setState(prevState => ({
            ...prevState,
            dialog: {
                ...prevState.dialog,
                open: false,
            }
        }))
    };

    render() {
        return (
            <>
                {this.state.upper !== undefined ?
                    <div className={style.container}
                    >
                        <Bracket upper={this.state.upper}
                                 lower={this.state.lower}
                                 final={this.state.final}
                                 gameClick={this.handleGameSelect}/>
                    </div> : null}

                <AddResultDialog
                    open={this.state.dialog.open}
                    data={this.state.dialog.data}
                    handleClose={this.handleDialogClose}
                    handleSubmit={this.handleSubmit}
                />
            </>
        )
    }
}
