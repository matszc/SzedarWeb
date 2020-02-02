import * as React from "react";
import api from "../../config";

class Ranking extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        api.get(`/user/ranking/${this.props.match.params.id}`).then(({data}) => {
            console.log(data);
        })
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Ranking
