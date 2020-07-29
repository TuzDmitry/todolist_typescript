import React, {CSSProperties} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/store";
import {LogOut} from "../../BLL/AuthReducer";

export const HeaderBlock = () => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const User = useSelector<AppStateType, string>(state => state.auth.login)
    const dispatch = useDispatch();

    const divStyle: CSSProperties = {
        boxSizing: "border-box",
        padding: "10px",
        backgroundColor: "rgba(29, 32, 38, 0.87)",
        height: "80px",
        borderTopLeftRadius: "15px",
        border: "1px solid black"
    };

    let onLogOutClick = () => {
        debugger
        dispatch(LogOut())

    }

    return (
        <div style={divStyle}>
            <div style={{float: "right", padding: "15px", color: "white"}}>
                {
                    isAuth ?
                        <>
                            <span style={{marginRight:"10px"}}>{User}</span>
                            <button onClick={onLogOutClick}>LOGOUT</button>
                        </>
                        :
                        <NavLink to={"/login"}>LOGIN</NavLink>
                }
            </div>
        </div>
    )
}

