import {Dispatch} from "redux";
import {API} from "../DAL/api";
import {FormDataType} from "../UI/auth/Login";

const AUTH_SUCCESS = "TODOLIST_TS/AuthReducer/AUTH_SUCCESS"
const AUTH_FAIL = "TODOLIST_TS/AuthReducer/AUTH_FAIL"

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: true
}

type InitialStateType = typeof initialState


export const AuthReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, email: action.email, login: action.login, userId: action.userId, isAuth: true}
        case AUTH_FAIL:
            return {...state, email: null, login: null, userId: null, isAuth: false}

        default:
            return state;
    }

}
type ActionType = any | SetAuthSuccessType | SetAuthFailType

type SetAuthSuccessType = {
    type: typeof AUTH_SUCCESS
    email: string
    login: string
    userId: number
}

type SetAuthFailType = { type: typeof AUTH_FAIL };

type DataType = {
    email: string
    login: string
    userId: number
}
////AC
const setAuthSuccess = (data: DataType): SetAuthSuccessType => ({
    type: AUTH_SUCCESS,
    email: data.email,
    login: data.login,
    userId: data.userId,
})

const setAuthFail = (): SetAuthFailType => ({type: AUTH_FAIL})


export const Autorization = () => {
    return async (dispatch: Dispatch<ActionType>) => {
        try {
            let res = await API.checkAuth()
            if (res.resultCode === 0) {
                dispatch(setAuthSuccess(res.data))
            } else {
                dispatch(setAuthFail())
            }
        } catch (e) {
            alert(e)
        }
        // dispatch(setAuthSuccess({email: "fdsfsdfsd", login: "fdsfs", userId: 21312}))
    }
}

export const LogIn = (formData: FormDataType) => {
    return async (dispatch: Dispatch<ActionType>) => {
        try {
            let res = await API.setAuth(formData)
            if (res.resultCode === 0) dispatch(Autorization())
        } catch (e) {
            alert(e)
        }
    }
}

export const LogOut = () => {

    return async (dispatch: Dispatch<ActionType>) => {
        try {
            let res = await API.delAuth()
            console.log(res)
            if (res.resultCode === 0) dispatch(setAuthFail())
        } catch (e) {
            alert(e)
        }
    }
}


