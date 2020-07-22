import React from 'react';
import './App.css';


import {connect} from "react-redux";
import {AppStateType} from "../BLL/store";
import {HeaderBlock} from './header/HeaderBlock';
import {Route, Redirect} from 'react-router-dom';
import {Login} from "./auth/Login";
import {API} from "../DAL/api";
import {Autorization} from "../BLL/AuthReducer";
import App from "./App";


type MapDispatchToPropsType = {
    Autorization: () => void
}

type MapStateToPropsType = {
    isAuth: boolean
}


class Initial extends React.Component<MapDispatchToPropsType & MapStateToPropsType> {

    componentDidMount = () => {
        this.props.Autorization()
    }


    render = () => {

        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <HeaderBlock/>
                <Route path={'/login'} component={Login}/>

                <Route path={'/'}
                       render={() => {
                           // debugger
                           if (!this.props.isAuth) return <Redirect to={"/login"}/>

                           return (
                               <App/>
                           )
                       }}/>


            </div>

        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}


const ConnectedInitial = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    Autorization

})(Initial);

export default ConnectedInitial;
