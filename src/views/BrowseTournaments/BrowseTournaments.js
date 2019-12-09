import React from "react";
import api from '../../config';
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import TournamentList from "../../components/tables/TournamentList";

class BrowseTournamentsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tournamentList: [],
        }
    }

    componentDidMount() {
        api.get('/tournament/GetAll').then(r => {
            console.log(r.data);
            this.setState((prevState) => ({
                ...prevState,
                tournamentList: r.data,
            }));
        })
    }

    rowClick = (id) => {
        //TODO sprawdzanie typów turnieju
        console.log(id);
        this.props.history.push(`browse/swiss/${id}`);
    };

    render() {
        return (
            <>
                <Container maxWidth={'md'}>
                    <Card>
                        <CardHeader title={'Browse your tournaments'}/>
                        <CardContent>
                            <TournamentList data={this.state.tournamentList} rowClick={this.rowClick}/>
                        </CardContent>
                    </Card>
                </Container>
            </>
        )
    }
}

export default BrowseTournamentsComponent;
