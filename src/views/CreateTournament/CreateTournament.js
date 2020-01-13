import React from "react";
import api from "../../config";
import {AddTournamentForm} from "../../components/forms/addTournamentForm";
import AppContext from "../../context/appContext";
import WrapperCard from "../../components/cards/wrapperCard";

const CreateTournamentComponent = ({history}) => {

    const context = React.useContext(AppContext);

    const submitTournament = (tournament) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === undefined) {
            context.snack.setSnack('warning', 'You need to register first');
            return;
        }
        tournament.Players = tournament.Players.filter(i => i !== '');
        api.post('/tournament/create', tournament)
            .then(() => {
                history.push('../browse');
            })
            .catch(() => context.snack.setSnack('error', 'Could not create tournament'));
    };
    return (
        <>
            <WrapperCard maxWidth={'md'} title={'Add new tournament'}>
                <AddTournamentForm
                    onSubmit={submitTournament}/>
            </WrapperCard>
        </>
    )
};

export default CreateTournamentComponent;
