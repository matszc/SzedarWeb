import * as React from "react";
import api from "../../config";
import AppContext from "../../context/appContext";
import WrapperCard from "../../components/cards/wrapperCard";
import EditPlayersForm from "../../components/forms/EditPlayersForm";
import EditTournamentDataForm from "../../components/forms/EditTournamentDataForm";

export class OpenTournamentDetails extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: null,
                name: null,
                city: null,
                address: null,
                startDate: null,
                gameType: null,
                players: null
            },
            loading: true,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    editTournament = async (data) => {
        data.players = null;

        await api.patch(`/tournament/editOpenTournament/${this.props.match.params.id}`, data).then(() => {
            this.context.snack.setSnack('success', 'Tournament edit success');
        })
    };

    editPlayer = async (data) => {
        delete data.editing;

        await api.patch(`/tournament/editPlayer/${this.props.match.params.id}/${data.id}/${data.nick}`).then(() => {
            this.context.snack.setSnack('success', 'Nick has been edited')
        });
    };

    addPlayer = async (data) => {
        const payload = data.filter(i => i.length > 0);

        await api.post(`/tournament/addPlayers/${this.props.match.params.id}`, payload).then(() => {
            this.loadData();
        })
            .catch((e) => {
                if (e.response && e.response.data) {
                    this.context.snack.setSnack('error', e.response.data);
                    return;
                }
                this.context.snack.setSnack('error', 'Can\'t add players');
            })
    };

    deletePlayer = async (data) => {

        await api.delete(`/tournament/deletePlayer/${this.props.match.params.id}/${data.id}`).then(() => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    data: {
                        ...prevState.data,
                        players: prevState.data.players.filter(i => i.id !== data.id),
                    }
                }
            });
            this.context.snack.setSnack('success', 'player deleted');
        }).catch(() => {
            this.context.snack.setSnack('error', 'couldn\'t delete player');
        });
    };

    loadData = () => {
        api.get(`/tournament/getOpenTournament/${this.props.match.params.id}`).then(({data}) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    data: {
                        ...data,
                        players: data.players.map(i => ({
                            ...i,
                            userId: i.userId.toString() === '00000000-0000-0000-0000-000000000000' ? null : i.userId
                        }))
                    },
                    loading: false,
                }
            })
        })
            .catch(() => {
                this.context.snack.setSnack('error', 'Can\'t download tournament');
            })
    };

    render() {
        return (
            <>
                {!this.state.loading ?
                    <WrapperCard title={this.state.data.name} maxWidth={'xs'}>
                        <EditTournamentDataForm data={this.state.data} submitFunc={this.editTournament}/>
                        <EditPlayersForm players={this.state.data.players} onEdit={this.editPlayer}
                                         onAdd={this.addPlayer} onDelete={this.deletePlayer}/>
                    </WrapperCard> : null}
            </>
        )
    }
}