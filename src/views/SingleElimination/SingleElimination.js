import * as React from "react";
import api from "../../config";
import Bracket from "../../components/bracket/bracket";
import style from '../../components/bracket/bracket.module.scss';
import AddResultDialog from "../../components/dialogs/AddResultDialog/AddResultDialog";
import AppContext from "../../context/appContext";

export class SingleElimination extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            rawData: undefined,
            dragging: false,
            dialog: {
                open: false,
                data: {},
            }
        };
        this.ref = React.createRef();
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

    handleGameSelect = (data) => {
        if (!data.editAble) {
            return;
        }
        this.setState(prevState => ({
            ...prevState,
            dialog: {
                open: true,
                data: data,
            }
        }))
    };

    handleDialogClose = () => {
        this.setState(prevState => ({
            ...prevState,
            dialog: {
                ...prevState.dialog,
                open: false,
            }
        }))
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Id: this.state.dialog.data.id,
            Player1Score: parseInt(event.target[0].value, 10),
            Player2Score: parseInt(event.target[1].value, 10),
            Player1: this.state.dialog.data.player1,
            Player2: this.state.dialog.data.player2,
        };

        api.patch('/singleElimination/match', data).then(() => {
            this.handleDialogClose();
            this.loadData();
        })
            .catch((r) => {
                console.log(r);
            })
    };

    render() {
        return (
            <>
                {this.state.rawData ?
                    <div className={style.container}
                         ref={this.ref}
                    >
                        <Bracket data={this.state.rawData} gameClick={this.handleGameSelect}/>
                    </div> : null}

                <AddResultDialog
                    open={this.state.dialog.open}
                    data={this.state.dialog.data}
                    handleClose={this.handleDialogClose}
                    handleSubmit={this.handleSubmit}
                />
            </>
        )
    }
}