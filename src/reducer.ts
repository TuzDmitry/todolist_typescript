import api from "./api";
import {TaskType, TodoType} from "./types/entities";
import {Dispatch} from "redux";

export const ADD_TODOLIST = "TodoList/Reducer/ADD_TODOLIST"
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD_TASK"
export const CHANGE_TASK = "TodoList/Reducer/CHANGE_TASK"
export const SET_TODOLISTS = 'SET_TODOLISTS'
export const SET_TASKS = 'SET_TASKS'
export const CHANGE_TODOLIST = 'TodoList/Reducer/CHANGE_TODOLIST'
export const CHANGE_PRELOADER_TODO = 'TodoList/Reducer/CHANGE_PRELOADER_TODO'
export const CHANGE_PRELOADER_TASKS = 'TodoList/Reducer/CHANGE_PRELOADER_TASKS'


type InitialStateType = {
    todolists: Array<TodoType>
    isPreloaderTodo: boolean
    isPreloaderTasks: boolean
}

////второй способ закоменчен
// type InitialStateType= typeof initialState

const initialState: InitialStateType = {
    todolists: [
        // {
        //     addedDate: "2020",
        //     id: "e75b1dca-1c11-4eb2-bca2-10cd270017a2",
        //     order: -4,
        //     title: "ewww",
        //     tasks: [{
        //         addedDate: "2020-05-14T19:55:29.983",
        //         deadline: null,
        //         description: null,
        //         id: "323d4c4b-873c-41bb-ab11-f9de8839454e",
        //         order: -2,
        //         priority: 2,
        //         startDate: null,
        //         status: 0,
        //         title: "dsdasdsa",
        //         todoListId: "b0e29d92-5cd1-4309-b781-12e4b257a44f"
        //     }]
        // }

    ],
    isPreloaderTodo: false,
    isPreloaderTasks: false

}


export const reducer = (state: InitialStateType = initialState, action: any) => {

    let newTodolists;
    switch (action.type) {

        case SET_TODOLISTS:
            return {...state, todolists: action.todolists}


        case ADD_TODOLIST:

            newTodolists = [action.newTodolistName, ...state.todolists]
            return {...state, todolists: newTodolists}

        case DELETE_TODOLIST:

            let arrTodoAfterDel = state.todolists.filter(todolist => todolist.id !== action.todolistId)
            arrTodoAfterDel = arrTodoAfterDel.map((todolist) => {
                return {...todolist}
            })
            return {
                ...state,
                todolists: arrTodoAfterDel
            }

        case SET_TASKS:
            let q = {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id != action.todoListId) {
                        return todo
                    } else {
                        return {...todo, tasks: action.tasks}
                    }
                })
            }
            console.log(q)
            return q;

        case ADD_TASK:
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {...todo, tasks: [action.newTask, ...todo.tasks]}
                }
            })
            return {...state, todolists: newTodolists}

        case CHANGE_TASK:
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.task.todoListId) {
                    return todo
                } else {

                    return {
                        ...todo,
                        tasks: todo.tasks.map(taska => {
                            if (taska.id !== action.task.id) {
                                return taska
                            } else {
                                return {...action.task}
                            }
                        })
                    }
                }
            })
            return {...state, todolists: newTodolists}


        case DELETE_TASK:
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    let arrTasksAfterDel = [...todo.tasks.filter(taska => taska.id !== action.taskId
                    )];
                    return {
                        ...todo, tasks: arrTasksAfterDel
                    }
                }
            })
            return {...state, todolists: newTodolists}

        case CHANGE_TODOLIST:
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {...todo, title: action.title}
                }
            })
            return {...state, todolists: newTodolists}

        case CHANGE_PRELOADER_TODO:
            return {...state, isPreloaderTodo: action.isPreloader}

        case CHANGE_PRELOADER_TASKS:
            return {...state, isPreloaderTasks: action.isPreloader}

        default:
            return state

    }
}
type TodoActionTypes=AddTodolistSuccessType|addTaskSuccessType

type AddTodolistSuccessType={
    type: typeof ADD_TODOLIST
    newTodolistName: TodoType
}

type addTaskSuccessType={
    type: typeof ADD_TASK
    todolistId:string
    newTask:TaskType
}

export const changePreloaderTodoAC = (isPreloader) => ({type: CHANGE_PRELOADER_TODO, isPreloader})

export const changePreloaderTasksAC = (isPreloader) => ({type: CHANGE_PRELOADER_TASKS, isPreloader})

export const addTodoListAC = (newTodolistName: TodoType):AddTodolistSuccessType => ({type: ADD_TODOLIST, newTodolistName: newTodolistName})

export const addTaskAC = (todolistId:string, newTask:TaskType):addTaskSuccessType => ({type: ADD_TASK, todolistId: todolistId, newTask: newTask})

export const changeTaskAC = (task) => {
    return (
        {
            type: CHANGE_TASK,
            task: task
        }
    )
}

export const deleteTodolistAC = (todolistId) => {
    return (
        {
            type: DELETE_TODOLIST,
            todolistId: todolistId
        }
    )
}

export const changeTodolistAC = (todoId: string, newtitle: string) => {
    return (
        {
            type: CHANGE_TODOLIST,
            todolistId: todoId,
            title: newtitle
        }
    )
}

export const deleteTaskAC = (todolistId, taskId) => {
    return (
        {
            type: DELETE_TASK,
            todolistId: todolistId,
            taskId: taskId
        }
    )
}

export const setTodoListsAC = (todolists:Array<TodoType>) => ({type: SET_TODOLISTS, todolists})

export const setTasksAC = (tasks:TaskType, todoListId:string) => {
    return (
        {
            type: SET_TASKS,
            tasks,
            todoListId
        }
    )
}

/////THUNKS
////from APP
export const getTodolists = () => {
    return (dispatch:Dispatch<TodoActionTypes>) => {
        dispatch(changePreloaderTodoAC(true))
        api.getTodolists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
                dispatch(changePreloaderTodoAC(false))
                // console.log(res.data);
            });
    }
}


export const addTodoList = (newTodolistName:string) => {
    return (dispatch) => {
        api.createTodolist(newTodolistName)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodoListAC(response.data.data.item))
                }
            })
    }
}

////from TodoList
export const deleteTodolist = (todoListId:string) => {
    return (dispatch) => {
        api.deleteTodolist(todoListId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    // debugger
                    dispatch(deleteTodolistAC(todoListId))
                }
            })
    }
}

export const changeTodolist = (todoListId:string, newtitle:string) => {
    return (dispatch) => {
        api.changeTodoTitle(todoListId, newtitle)
            .then(
                dispatch(changeTodolistAC(todoListId, newtitle))
            )
    }
}

export const getTasks = (todoListId:string) => {
    return (dispatch) => {
        dispatch(changePreloaderTasksAC(true))
        api.getTasks(todoListId)
            .then(response => {
                console.log(response)
                if (!response.data.error) {
                    dispatch(setTasksAC(response.data.items, todoListId))
                    dispatch(changePreloaderTasksAC(false))
                }
            })
    }
}


export const addTask = (todoListId, newText) => {
    return (dispatch) => {
        api.createTask(todoListId, newText)
            .then(response => {
                if (response.data.resultCode === 0) {
                    let newTask = response.data.data.item;
                    dispatch(addTaskAC(todoListId, newTask))
                }
            })
    }
}

export const deleteTask = (todoListId, taskId) => {
    return (dispatch) => {
        api.deleteTask(todoListId, taskId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(deleteTaskAC(todoListId, taskId))
                }
            })
    }
}


export const changeTask = (task, newPropsObj) => {
    return (dispatch) => {
        api.changeTask(task, newPropsObj)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTaskAC(response.data.data.item))
                }
            })
    }
}


// export const setStateFromLocalStorageAC=()=>{
//     localStorage
//     let dd=localStorage.getItem('dasdas')
//     let stateFromLS=JSON.parse(dd)
//     return (
//         {type: "SET-STATE-FROM-LOCAL-STORAGE",
//         stateFromLS:stateFromLS}
//     )
// }