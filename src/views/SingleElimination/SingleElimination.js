import * as React from "react";
import api from "../../config";
import Bracket from "../../components/bracket/bracket";
import style from '../../components/bracket/bracket.module.scss';

export class SingleElimination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: undefined,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        api.get(`/singleElimination/flat/${this.props.match.params.id}`).then(({data}) => {
            console.log(data);
            this.setState(prevState => ({
                ...prevState,
                rawData: data,
            }))
        })
    };

    render() {
        return (
            <>
                {this.state.rawData ?
                    <div className={style.container}>
                        <Bracket data={this.state.rawData}>

                        </Bracket>
                    </div> : null}
            </>
        )
    }
}
