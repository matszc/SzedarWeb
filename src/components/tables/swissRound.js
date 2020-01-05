import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    wrapper: {
        'justify-content': 'center',
        display: 'flex'
    },
    table: {
        width: "60%"
    },
    tableCell: {
        color: 'rgba(255,255,255,0.5)',
    }
}));


const SwissRound = ({data, click}) => {

    const classes = useStyles();

    const columns = ['player1', 'player1Score', 'player2Score', 'player2', 'actions'];

    return (
        <>
            <div className={classes.wrapper}>
                <Table className={classes.table}>
                    <TableBody>
                        {data.map(round => (
                            <TableRow hover key={round.id} onClick={() => click(round)}
                            >
                                {columns.map((matchProp, index) => {
                                    const winnerP1 = round.player1Score > round.player2Score;
                                    const winnerP2 = round.player1Score < round.player2Score;
                                    return (
                                        <TableCell
                                            className={(winnerP1 && matchProp === 'player2') || (winnerP2 && matchProp === 'player1') ? classes.tableCell : null}
                                            align={index < 2 ? 'right' : 'left'}
                                            key={index}>
                                            {round[matchProp]}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
};

export default SwissRound
