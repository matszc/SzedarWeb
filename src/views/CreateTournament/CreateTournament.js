import React from "react";
import api from "../../config";
import {AddTournamentForm} from "../../components/forms/addTournamentForm";
import AppContext from "../../context/appContext";
import WrapperCard from "../../components/cards/wrapperCard";

const CreateTournamentComponent = ({history}) => {

    const context = React.useContext(AppContext);

    const submitTournament = (tournament, open) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === undefined) {
            context.snack.setSnack('warning', 'You need to register first');
            return;
        }
        tournament.Players = tournament.Players.filter(i => i !== '');
        if (open) {

            if (tournament.Players.length >= tournament.MaxNumberOfPlayers) {
                context.snack.setSnack('error', 'Maximum number of players excited');
                return;
            }
            if (tournament.StartDate === 'Invalid Date') {
                return;
            }
            const dateNow = new Date();
            if (tournament.StartDate.getTime() < dateNow.getTime()) {
                context.snack.setSnack('error', 'Select further date');
                return;
            }

            api.post('/tournament/create/open', tournament).then(() => {
                history.push('../browse');
            })
                .catch(() => context.snack.setSnack('error', 'Could not create tournament'));
        } else {
            api.post('/tournament/create', tournament)
                .then(() => {
                    history.push('../browse');
                })
                .catch(() => context.snack.setSnack('error', 'Could not create tournament'));
        }
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
