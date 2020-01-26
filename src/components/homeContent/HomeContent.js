import React from "react";
import Typography from "@material-ui/core/Typography";

const HomeContent = () => (
    <>
        <Typography paragraph>
            Szedar is a wabside that helps you to organize tournament in online games.<br/>
            You can choose one of three possible formats:<br/>
            -Swiss system<br/>
            -Double elimination tree<br/>
            -Single elimination tree<br/>
        </Typography>
        <Typography paragraph>
            Swiss system matching algorithm is focused on matching pairs that didn't play each other yet,
            second criterion is matching players that are closes to each other in current table.
            It means if you setup numbers of round equal to number of players - 1 so every player will play each other
            in this tournament.<br/>
            In order to start new round owner of tournament have to manually create it using showed button.
            When you create new round previous matches are no longer possible to edit results.<br/>
            The tie breakers in swiss are following:<br/>
            T1 - number of player's opponents wins<br/>
            T2 - number of player's opponents T1s<br/>
            T3 - difference between player's small matches win and lost
        </Typography>
        <Typography paragraph>
            Elimination system provides you bracket when owner of tournament can insert results.<br/>
            Seeds in tournament are based on order how players name were inserted during creation (1 player - 1 seed, 2
            player - 2 seed...)<br/>
            You can edit match results only until next match result isn't provided.
        </Typography>
        <Typography paragraph>
            This is first version of application if you want to report any error or make a feature request contact me
            on <strong>mateuszszczesniak25@gmail.com</strong>
        </Typography>
    </>
);

export default HomeContent;
