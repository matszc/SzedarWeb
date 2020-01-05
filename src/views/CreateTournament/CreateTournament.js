import React from "react";
import api from "../../config";
import {AddTournamentForm} from "../../components/forms/addTournamentForm";
import AppContext from "../../context/appContext";
import WrapperCard from "../../components/cards/wrapperCard";

const CreateTournamentComponent = ({history}) => {

    const context = React.useContext(AppContext);

    const submitTournament = (tournament) => {
        tournament.Players = tournament.Players.filter(i => i !== '');
        api.post('/tournament/create', tournament)
            .then(() => {
                context.snack.setSnack('success', 'Tournament Created');
                history.push('../browse');
                //TODO snack if you;re not sign in
            })
            .catch(r => console.log(r));
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
