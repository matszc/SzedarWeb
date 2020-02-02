import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cup from '../../cup.jpg';
import moment from "moment";
import {gameTypes} from "../../config";

const useStyles = makeStyles({
    root: {
        maxWidth: 370,
    },
    paragraph: {
        margin: '10px 0',
    }
});

export const TournamentCard = ({data, onJoin}) => {
    const classes = useStyles();
    const date = new Date(data.startDate);
    const startDate = moment(date.setHours(date.getHours() + 1)).format('DD-MM-YYYY HH:mm');
    return (
        <Card className={classes.root}>
            <CardMedia
                component="img"
                alt="Tournament image"
                height="180"
                image={cup}
                title={data.tournaments}
            />
            <CardContent>
                <Typography className={classes.paragraph} gutterBottom variant="h5" component="h2">
                    {data.name}
                </Typography>
                <Typography className={classes.paragraph} variant="body2" color="textSecondary" component="p">
                    Game: {gameTypes(data.gameType)}
                </Typography>
                <Typography className={classes.paragraph} variant="body2" color="textSecondary" component="p">
                    Start Date: {startDate}
                </Typography>
                <Typography className={classes.paragraph} variant="body2" color="textSecondary" component="p">
                    Players: {data.numberOfPlayers} / {data.maxNumberOfPlayers}
                </Typography>
                <Typography className={classes.paragraph} variant="body2" color="textSecondary" component="p">
                    Address: {data.address} {data.city}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => onJoin(data.id)} size="large" color="primary">
                    Join tournament
                </Button>
            </CardActions>
        </Card>
    );
};

export default TournamentCard;
