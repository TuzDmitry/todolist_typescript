import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListReducer} from "./TodoListReducer";
import thunkMiddleware from 'redux-thunk'
import { AuthReducer } from "./AuthReducer";
import {reducer as formReducer} from "redux-form"

let rootReducer=combineReducers({
    auth: AuthReducer,
    todoPage:TodoListReducer,
    form:formReducer
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
///// typeof rootReducer-это тип нашей функции редьюсер, которая возвращает наш стейт
type RootRecuderType= typeof rootReducer

///// ReturnType<RootRecuderType>- это ка раз тот тип который нам вернула функция редьюсер- то есть стейт
export type AppStateType=ReturnType<RootRecuderType>

export default store;