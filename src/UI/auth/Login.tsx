import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/store";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/formsComponets";
import {email, maxLength25,  requiredField} from "../common/validators";
import {LogIn} from "../../BLL/AuthReducer";


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}


//1
const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div style={{
                boxSizing: "border-box", padding: "15px", color: "white", backgroundColor: "#333", marginBottom:"15px", borderRadius:"5px"
            }}>
                <div><i>данные тестового аккаунта:</i></div>
                <div>Email: <ins>free@samuraijs.com</ins></div>
                <div>Password: <ins>free</ins></div>
            </div>
            <div>
                <Field type="text"
                       placeholder={"email"}
                       component={Input}
                       name={"email"}
                       validate={[requiredField, email, maxLength25]}
                />

            </div>
            <div>
                <Field type="text"
                       placeholder={"password"}
                       component={Input}
                       name={"password"}
                       validate={[requiredField]}
                />
            </div>
            <div>
                <Field type="checkbox"
                       id="styled-checkbox-1"
                       component={'input'}
                       name={"rememberMe"}/>
                <label htmlFor="styled-checkbox-1">remember me</label>
            </div>
            <button className={"butt"}>Login</button>
        </form>
    )
}
//2
const ReduxLoginForm = reduxForm<FormDataType>({form: "login"})(LoginForm)

//3
export const Login: React.FC = () => {

    let dispatch = useDispatch();
    let isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth);

    const onSubmit = (formData: FormDataType) => {
        dispatch(LogIn(formData));
    }

    if (isAuth) return <Redirect to={"/"}/>
    return (
        <ReduxLoginForm onSubmit={onSubmit}/>
    )
}