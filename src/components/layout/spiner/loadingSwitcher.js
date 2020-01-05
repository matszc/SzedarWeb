import * as React from "react";
import AppContext from "../../../context/appContext";

const LoadingSwitcher = () => {

    return (<AppContext.Consumer>
            {(context) => (
                <button className={'Superhidenbuttom'}
                        onClick={() => context.loader.setLoading(!context.loader.loading)}>1</button>
            )}
        </AppContext.Consumer>
    )
};

export default LoadingSwitcher;
