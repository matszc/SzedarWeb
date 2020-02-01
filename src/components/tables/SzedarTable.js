import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import PropTypes, {object} from "prop-types";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto',
    },
});


const SzedarTable = ({data, rowClick, columns, paginator, startClick}) => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        variant={'head'}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow
                                        hover
                                        role={'checkbox'}
                                        tabIndex={-1}
                                        key={row.id}
                                        onClick={() => rowClick(row)}
                                    >
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                >
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            )
                                        })}
                                        {row.open && startClick ?
                                            <TableCell>
                                                <Button variant="contained" color="primary"
                                                        onClick={() => startClick(row)}>
                                                    Start
                                                </Button>
                                            </TableCell>
                                            : null}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                {paginator ?
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 50]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> : null
                }
            </Paper>
        </>
    )
};

SzedarTable.propTypes = {
    data: PropTypes.arrayOf(object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        format: PropTypes.func,
    })).isRequired,
    rowClick: PropTypes.func,
    paginator: PropTypes.bool,
};

SzedarTable.defaultProps = {
    rowClick: () => {
    }
};

export default SzedarTable
