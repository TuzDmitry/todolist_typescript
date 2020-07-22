import {Dispatch} from "redux";
import {API} from "../DAL/api";

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
            debugger
            return {...state, email: action.email, login: action.login, userId: action.userId, isAuth: true}
        case AUTH_FAIL:
            debugger
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
        debugger
        let res = await API.checkAuth()
        try {
            debugger
            if (res.resultCode === 0) {
                dispatch(setAuthSuccess(res.data))
            } else {
                dispatch(setAuthFail())
            }
        } catch (e) {
            debugger
            console.log(e)
        }
        // dispatch(setAuthSuccess({email: "fdsfsdfsd", login: "fdsfs", userId: 21312}))
    }
}

export const LogIn = () => {
    return async (dispatch: Dispatch<ActionType>) => {
        let res = await API.setAuth()
        try {
            debugger
            if (res.resultCode === 0) dispatch(Autorization())
        } catch (e) {
            alert(e)
        }
    }
}

export const LogOut = () => {

    return async (dispatch: Dispatch<ActionType>) => {
        debugger
        let res = await API.delAuth()
        try {
            console.log(res)
            debugger

            if (res.resultCode === 0) dispatch(setAuthFail())
        } catch (e) {
            alert(e)
        }
    }
}


