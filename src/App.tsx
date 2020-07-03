import React from 'react';
import './App.css';


import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, getTodolists} from "./reducer";
import {AppStateType} from "./store";
import {TodoType} from "./types/entities";
import Preloader from "./Preloader";


type MapDispatchToPropsType={
    getTodolists:()=>void
    addTodoList:(title:string)=>void
}

type MapStateToPropsType={
    todolists: Array<TodoType>
    isPreloaderTodo: boolean
}


class App extends React.Component<MapDispatchToPropsType&MapStateToPropsType>{

    componentDidMount = () => {
        this.restoreState()
    }


    restoreState = () => {
// вызов колбека который нам предоставил connect для вызова санки
        this.props.getTodolists()
    }


    addTodoList = (newTodolistName:string) => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.addTodoList(newTodolistName)

    }


    render = () => {
        // debugger;
        let todolists = this.props.todolists.map(tl => {
            return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>
        })
        return (
            <>
                <Preloader isPreloader={this.props.isPreloaderTodo}/>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                </div>
            </>

        );
    }
}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        todolists: state.todoPage.todolists,
        isPreloaderTodo: state.todoPage.isPreloaderTodo
    }
}



const ConnectedApp = connect<MapStateToPropsType, MapDispatchToPropsType,{},AppStateType>(mapStateToProps, {addTodoList, getTodolists})(App);

export default ConnectedApp;
