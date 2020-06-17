import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";

import {
     changeTodolist, deleteTodolist,
    getTasks, addTask, deleteTask, changeTask
} from "./reducer";
import Preloader from "./Preloader";
import {TaskType, UpadateTaskType} from "./types/entities";
import {AppStateType} from "./store";


type OwnPropsType={
    tasks: Array<TaskType>
    isPreloaderTasks:boolean
    id: string
    title: string
}


type MapStateToPropsType={
    ///перечисляем то чем будем пользоваться в компоненте из пропсов
    isPreloaderTasks:boolean
}

type MapDispatchToPropsType={
    deleteTodolist:(id:string)=>void
    changeTodolist:(todoListId:string, newtitle:string)=>void
    getTasks:(id:string)=>void
    addTask:(id:string, newText:string)=>void
    deleteTask:(id:string,taskId:string)=>void
    changeTask:(task:TaskType, newPropsObj:UpadateTaskType)=>void
}


class TodoList extends React.Component <OwnPropsType&MapDispatchToPropsType&MapStateToPropsType>{

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.getTasks(this.props.id)
    }


    state = {
        tasks: [
            // {id: 1, title: "JS", isDone: true, priority: 'low'},
            // {id: 2, title: "HTML", isDone: true, priority: 'high'},

        ], filterValue: "All"
    }


    deleteTodolist = () => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.deleteTodolist(this.props.id)

    }

    changeTodoTitle = (todoListId:string, newtitle:string) => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.changeTodolist(todoListId, newtitle)
    }

    addTask = (newText:string) => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.addTask(this.props.id, newText)
    }

    deleteTask = (taskId:string) => {

        this.props.deleteTask(this.props.id, taskId)
    }


    changeFilter = (newfilterValue:string) => {
        this.setState({filterValue: newfilterValue});
    }



    changeTask = (task:TaskType, newPropsObj:UpadateTaskType) => {

        // вызов колбека который нам предоставил connect для вызова санки
        this.props.changeTask(task, newPropsObj)
    }

    changeStatus = (task:TaskType, status:number) => {
        this.changeTask(task, {status: status})
    }

    changeTitle = (task:TaskType, newtitle:string) => {
        this.changeTask(task, {title: newtitle})
    }

    changePriority = (task:TaskType, newPriorityValue:string) => {
        this.changeTask(task, {priority: newPriorityValue})
    }





    render = () => {

        let {tasks= []} = this.props

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle title={this.props.title}
                                       id={this.props.id}
                                       changeTodoTitle={this.changeTodoTitle}/>
                        <div>
                            <span className="idTodo">{`# ${this.props.id.slice(0, 4)}`}</span>
                            <button className="deleterTodo" onClick={this.deleteTodolist}>x</button>
                        </div>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <Preloader isPreloader={this.props.isPreloaderTasks}/>
                    <TodoListTasks
                        deleteTask={this.deleteTask}
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        changePriority={this.changePriority}

                        tasks={tasks.filter(t => {
                            switch (this.state.filterValue) {
                                case "All":
                                    return true;
                                case "Completed":
                                    return t.status === 2;
                                case "Active":
                                    return t.status === 0;
                                default:
                                    return true;
                            }
                        })}
                    />
                    <TodoListFooter changeFilter={this.changeFilter}
                                    filterValue={this.state.filterValue}/>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType) => {
    return {
        isPreloaderTasks: state.todoPage.isPreloaderTasks
    }
}


const TodolistConnect = connect<MapStateToPropsType, MapDispatchToPropsType,{}, AppStateType>(mapStateToProps,
    {deleteTodolist,changeTodolist,
        getTasks,addTask, deleteTask,changeTask}
        )(TodoList)

export default TodolistConnect;



