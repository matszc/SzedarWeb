import * as React from "react";
import AppContext from "../../../context/appContext";

class LoadingSwitcher extends React.Component {


    render() {
        return <AppContext.Consumer>
            {(context) => (
                <button className={'Superhidenbuttom'} onClick={() => context.setLoading(!context.loading)}>1</button>
            )}
        </AppContext.Consumer>
    }
}

export default LoadingSwitcher;