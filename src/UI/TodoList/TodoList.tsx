import React from 'react';
import '../App.css';
import AddNewItemForm from './AddNewItemForm';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from './TodoListTitle';
import {connect} from 'react-redux';

import {
    changeTodolist, deleteTodolist,
    getTasks, addTask, deleteTask, changeTask
} from '../../BLL/TodoListReducer';
import Preloader from '../common/Preloader';
import {TaskType, UpadateTaskType} from '../../types/entities';
import {AppStateType} from '../../BLL/store';
import {DeleteOutlined} from '@material-ui/icons';
import {IconButton} from '@material-ui/core';

type StateType = {
    filterValue: string
}

type OwnPropsType = {
    tasks: Array<TaskType>
    id: string
    title: string
}

type MapStateToPropsType = {
    isPreloaderTasks: boolean
}

type MapDispatchToPropsType = {
    deleteTodolist: (id: string) => void
    changeTodolist: (todoListId: string, newtitle: string) => void
    getTasks: (id: string) => void
    addTask: (id: string, newText: string) => void
    deleteTask: (id: string, taskId: string) => void
    changeTask: (task: TaskType, newPropsObj: UpadateTaskType) => void
}

type PropsType = OwnPropsType & MapDispatchToPropsType & MapStateToPropsType

class TodoList extends React.Component <PropsType, StateType> {

    state: StateType = {
        filterValue: 'All'
    }

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTasks(this.props.id)
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }

    changeTodoTitle = (todoListId: string, newtitle: string) => {
        this.props.changeTodolist(todoListId, newtitle)
    }

    addTask = (newText: string) => {
        this.props.addTask(this.props.id, newText)
    }

    deleteTask = (taskId: string) => {
        this.props.deleteTask(this.props.id, taskId)
    }


    changeFilter = (newfilterValue: string) => {
        this.setState({filterValue: newfilterValue});
    }


    changeTask = (task: TaskType, newPropsObj: UpadateTaskType) => {
        this.props.changeTask(task, newPropsObj)
    }

    changeStatus = (task: TaskType, status: number) => {
        this.changeTask(task, {status: status})
    }

    changeTitle = (task: TaskType, newtitle: string) => {
        this.changeTask(task, {title: newtitle})
    }

    changePriority = (task: TaskType, newPriorityValue: string) => {
        this.changeTask(task, {priority: newPriorityValue})
    }

    render = () => {

        let {tasks = []} = this.props

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                            <TodoListTitle title={this.props.title}
                                           id={this.props.id}
                                           changeTodoTitle={this.changeTodoTitle}/>
                            <IconButton onClick={this.deleteTodolist} className="deleterTodo">
                                <DeleteOutlined/>
                            </IconButton>
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
                                case 'All':
                                    return true;
                                case 'Completed':
                                    return t.status === 2;
                                case 'Active':
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

const mapStateToProps = (state: AppStateType) => {
    return {
        isPreloaderTasks: state.todoPage.isPreloaderTasks
    }
}


const TodolistConnect = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
    {
        deleteTodolist, changeTodolist,
        getTasks, addTask, deleteTask, changeTask
    }
)(TodoList)

export default TodolistConnect;



