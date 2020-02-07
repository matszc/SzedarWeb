import * as React from "react";
import api from "../../config";
import SzedarTable from "../../components/tables/SzedarTable";

const columns = [{
    id: 'position',
    label: 'Position',
    format: value => value.toLocaleString(),
}, {
    id: 'player',
    label: 'Nick',
    format: value => value.toLocaleString(),
}, {
    id: 'matchesWon',
    label: 'Matches Won',
    format: value => value.toLocaleString(),
}, {
    id: 'matchesLost',
    label: 'Matches Lost',
    format: value => value.toLocaleString(),
}, {
    id: 'ratio',
    label: 'Wins / Losses',
    format: value => value.toLocaleString(),
}, {
    id: 'points',
    label: 'Points',
    format: value => value.toLocaleString(),
}];

class Ranking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ranking: [],
        }

    }

    componentDidMount() {
        api.get(`/user/ranking/${this.props.match.params.id}`).then(({data}) => {
            const ranking = data.map(i => ({
                ...i,
                ratio: `${i.wins} / ${i.losses}`
            }));
            this.setState({ranking: ranking});
        })
    }


    render() {
        return (
            <>
                <SzedarTable data={this.state.ranking} columns={columns} paginator/>
            </>
        );
    }
}

export default Ranking
