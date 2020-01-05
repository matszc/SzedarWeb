import * as React from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import style from '../../views/Swiss/swiss.module.scss'

const SzedarTabs = ({tabs, currentRound, value, onChange}) => {

    return (
        <Paper square className={style.tabs}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={onChange}
            >
                {tabs.map((i) => (
                    <Tab key={i} label={`Round ${i}`} disabled={i > currentRound}/>
                ))}
            </Tabs>
        </Paper>
    );
};

export default SzedarTabs;
