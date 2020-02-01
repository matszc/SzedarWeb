import React from 'react';
import HomeContent from "../../components/homeContent/HomeContent";
import api from "../../config";

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        api.get("/user/tournaments").then(({data}) => {
            console.log(data);
        })
    }


    render() {
        return (
            <>
                <HomeContent/>
            </>
        )
    }
}

export default HomeComponent;
