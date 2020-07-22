import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/store";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
export const Login=(props:any)=>{

    let dispatch=useDispatch()
    let isAuth=useSelector<AppStateType, boolean>(state=>state.auth.isAuth)


    if (isAuth) return <Redirect to={"/"}/>
    return(
        <div>
            <div>
                <input type="text" placeholder={"login"}/>
            </div>
            <div>
                <input type="text" placeholder={"password"}/>
            </div>
        </div>
    )
}


const LoginForm=()=>{
    return(
        <div>
            <div>
                <Field type="text"
                       placeholder={"email"}
                       // component={Input}
                />
            </div>
            <div>
                <Field type="text" placeholder={"password"}/>
            </div>
            <div>
                <Field type="checkbox" />
                remember me
            </div>
        </div>
    )
}