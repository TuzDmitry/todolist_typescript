import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
import AddNewItemForm from './TodoList/AddNewItemForm';
import {connect} from 'react-redux';
import {addTodoList, getTodolists} from '../BLL/TodoListReducer';
import {AppStateType} from '../BLL/store';
import Preloader from './common/Preloader';
import {TodoType} from '../types/entities';
import {Grid, Paper} from '@material-ui/core';

type MapDispatchToPropsType = {
    getTodolists: () => void
    addTodoList: (title: string) => void
}

type MapStateToPropsType = {
    todolists: Array<TodoType>
    isPreloaderTodo: boolean
    isAuth: boolean
}

class App extends React.Component<MapDispatchToPropsType & MapStateToPropsType> {

    componentDidMount = () => {
        this.restoreState()
    }
    restoreState = () => {
        this.props.getTodolists()
    }

    addTodoList = (newTodolistName: string) => {
        this.props.addTodoList(newTodolistName)

    }

    render = () => {
        let todolists = this.props.todolists.map(tl => {
            return <Grid item color={'red'}><Paper style={{backgroundColor:'#e3e5eb', padding:'10px'}}>
                <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>
            </Paper></Grid>
        })
        return (
            <div>
                <Preloader isPreloader={this.props.isPreloaderTodo}/>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <Grid container spacing={3}>
                    {/*<div className="App">*/}
                    {todolists}
                    {/*</div>*/}
                </Grid>
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
