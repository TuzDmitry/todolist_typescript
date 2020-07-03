import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducer} from "./reducer";
import thunkMiddleware from 'redux-thunk'

let rootReducer=combineReducers({
    todoPage:reducer
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
///// typeof rootReducer-это тип нашей функции редьюсер, которая возвращает наш стейт
type RootRecuderType= typeof rootReducer

///// ReturnType<RootRecuderType>- это ка раз тот тип который нам вернула функция редьюсер- то есть стейт
export type AppStateType=ReturnType<RootRecuderType>

export default store;