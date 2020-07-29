import React from 'react';
import './App.css';

import TodoList from "./TodoList/TodoList";
import AddNewItemForm from "./TodoList/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodolists} from "../BLL/TodoListReducer";
import {AppStateType} from "../BLL/store";
import Preloader from './common/Preloader';
import {TodoType} from "../types/entities";
import {url} from "inspector";



type MapDispatchToPropsType = {
    getTodolists: () => void
    addTodoList: (title: string) => void

}

type MapStateToPropsType = {
    todolists: Array<TodoType>
    isPreloaderTodo: boolean
    isAuth:boolean
}


class App extends React.Component<MapDispatchToPropsType & MapStateToPropsType> {

    componentDidMount = () => {
        this.restoreState()
    }


    restoreState = () => {
// вызов колбека который нам предоставил connect для вызова санки
        this.props.getTodolists()
    }


    addTodoList = (newTodolistName: string) => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.addTodoList(newTodolistName)

    }


    render = () => {
        // debugger;
        let todolists = this.props.todolists.map(tl => {
            return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>
        })
        return (
            <div
            //     style={{
            //     // backgroundColor: "rgba(28,41,41,0.87)",
            //     backgroundImage: "url(https://ismile-service.ru/images/bg20.jpg)",
            //     minHeight:"80vh"
            // }}
            >
                <Preloader isPreloader={this.props.isPreloaderTodo}/>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        todolists: state.todoPage.todolists,
        isPreloaderTodo: state.todoPage.isPreloaderTodo,
        isAuth: state.auth.isAuth
    }
}


const ConnectedApp = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    addTodoList,
    getTodolists

})(App);

export default ConnectedApp;
