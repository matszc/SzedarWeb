import * as React from "react";
import api from "../../config";

export class SingleElimination extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        api.get(`/singleElimination/${this.props.match.params.id}`).then(r => {
            console.log(r.data);
        })
    };

    render() {
        return (
            <div>

            </div>
        )
    }
}
