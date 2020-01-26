import * as React from "react";
import api from "../../config";
import AddResultDialog from "../../components/dialogs/AddResultDialog/AddResultDialog";
import Bracket from "../../components/bracket/bracket";
import AppContext from "../../context/appContext";

export class DoubleElimination extends React.Component {

    static contextType = AppContext;

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
            const final = data.filter(({matchCode}) => matchCode === 'Final1' || matchCode === 'Final2').sort((a, b) => {
                return (a.matchCode < b.matchCode) ? -1 : (a.matchCode > b.matchCode) ? 1 : 0;
            });

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

    handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Id: this.state.dialog.data.id,
            Player1Score: parseInt(event.target[0].value, 10),
            Player2Score: parseInt(event.target[1].value, 10),
            Player1: this.state.dialog.data.player1,
            Player2: this.state.dialog.data.player2,
        };

        if (this.state.dialog.data.matchCode === 'Final1') {
            const lowerMatch = this.state.lower.find(m => m.player1 === data.Player1 || m.player1 === data.Player2
                || m.player2 === data.Player1 || m.player2 === data.Player2);
            data.FromLowerBracket = lowerMatch.player1 === data.Player1 || lowerMatch.player2 === data.Player1 ? data.Player1 : data.Player2;
        }

        api.post(`/doubleElimination/match/${data.Id}`, data).then(() => {
            this.handleDialogClose();
            this.loadData();
        })
            .catch(() => {
                this.context.snack.setSnack('error', 'Could\'t add result ');
                this.handleDialogClose();
            })
    };

    handleGameSelect = (data) => {
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
                    <Bracket upper={this.state.upper}
                             lower={this.state.lower}
                             final={this.state.final}
                             gameClick={this.handleGameSelect}/>
                    : null}

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
