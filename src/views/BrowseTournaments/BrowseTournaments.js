import React from "react";
import {api, tournamentTypes} from '../../config';
import SzedarTable from "../../components/tables/SzedarTable";
import WrapperCard from "../../components/cards/wrapperCard";
import moment from "moment";

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
    label: 'Creation date',
    format: value => value.toLocaleString(),
}];

class BrowseTournamentsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tournamentList: [],
        }
    }

    componentDidMount() {
        api.get('/tournament/GetAll').then(r => {
            const tournamentList = r.data.map(t => ({
                ...t,
                creationDate: moment(t.creationDate).format('DD-MM-YYYY HH:mm'),
                type: tournamentTypes(t.type),
            }));
            this.setState((prevState) => ({
                ...prevState,
                tournamentList: tournamentList,
            }));
        })
    }

    rowClick = ({id, type}) => {
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

    render() {
        return (
            <>
                <WrapperCard maxWidth={'md'} title={'Browse your tournaments'}>
                    <SzedarTable data={this.state.tournamentList} rowClick={this.rowClick} columns={columns} paginator/>
                </WrapperCard>
            </>
        )
    }
}

export default BrowseTournamentsComponent;
