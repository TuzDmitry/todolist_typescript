import React from "react";
import preloader from '../src/assets/images/preloader.gif'


type OwnPropsType={
    isPreloader: boolean
}

const Preloader = (props:OwnPropsType) => {
    return (
        <>
            {props.isPreloader && <div>
            <img src={preloader} alt=""/>
        </div>}
        </>
    )
}

export default Preloader;