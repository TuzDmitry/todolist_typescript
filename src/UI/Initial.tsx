import React from 'react';
import './App.css';
import './App.css';

import {connect} from 'react-redux';
import {AppStateType} from '../BLL/store';
import {HeaderBlock} from './header/HeaderBlock';
import {Route, Redirect} from 'react-router-dom';
import {Login} from './auth/Login';
import {Autorization} from '../BLL/AuthReducer';
import App from './App';


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
            <div style={{backgroundImage: 'url(https://1.bp.blogspot.com/-87h7BkqdSAw/UxK2VKhQheI/AAAAAAAAJSo/sbeFofTMYOg/s1600/368904.jpg)'}}>
                <HeaderBlock/>
                <div style={{minHeight: '80vh'}}>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/'}
                           render={() => {
                               if (!this.props.isAuth) return <Redirect to={'/login'}/>
                               return <App/>
                           }}/>

                </div>
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
