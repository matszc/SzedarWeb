import React from "react";
import api from "../../config";
import {AddTournamentForm} from "../../components/forms/addTournamentForm";
import AppContext from "../../context/appContext";
import {CardContent, CardHeader, Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";

const CreateTournamentComponent = ({history}) => {

    const context = React.useContext(AppContext);

    const submitTournament = (tournament) => {
        tournament.Players = tournament.Players.filter(i => i !== '');
        api.post('/tournament/create', tournament)
            .then(r => {
                context.snack.setSnack('success', 'Tournament Created');
                history.push('../browse');
            })
            .catch(r => console.log(r));
    };
    return (
        <>
            <Container maxWidth={'md'}>
                <Card>
                    <CardHeader title='Add new tournament'/>
                    <CardContent>
                        <AddTournamentForm
                            onSubmit={submitTournament}/>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
};

export default CreateTournamentComponent;
