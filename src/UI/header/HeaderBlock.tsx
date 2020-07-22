import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/store";
import {LogIn, LogOut} from "../../BLL/AuthReducer";

export const HeaderBlock = (props: any) => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const User = useSelector<AppStateType, string>(state => state.auth.login)
    const dispatch = useDispatch();

    const divStyle = {
        backgroundColor: "#BC0B35",
        height: "80px",
        borderTopLeftRadius: "15px",
        border: "1px solid black"
    };


    let onLogInClick = () => {
        dispatch(LogIn())
        alert('зашел')
    }
    let onLogOutClick = () => {
        debugger
        dispatch(LogOut())
        // alert('вышел')
    }



    return (
        <div style={divStyle}>
            {
                isAuth ?
                    <div>
                        {User}
                        <button onClick={onLogOutClick}>LOGOUT</button>

                    </div> :
                    <>
                        <NavLink to={"/login"}>LOGIN</NavLink>
                        <button onClick={onLogInClick}>LOGIN</button>
                    </>
            }
        </div>
    )
}

