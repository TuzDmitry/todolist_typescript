import api from "./api";
import {TaskType, TodoType, UpadateTaskType} from "./types/entities";
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
        //     // tasks: [{
        //     //     addedDate: "2020-05-14T19:55:29.983",
        //     //     deadline: null,
        //     //     description: null,
        //     //     id: "323d4c4b-873c-41bb-ab11-f9de8839454e",
        //     //     order: -2,
        //     //     priority: 2,
        //     //     startDate: null,
        //     //     status: 0,
        //     //     title: "dsdasdsa",
        //     //     todoListId: "b0e29d92-5cd1-4309-b781-12e4b257a44f"
        //     // }]
        // }

    ],
    isPreloaderTodo: false,
    isPreloaderTasks: false

}


export const reducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType => {

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
            return {...state, todolists: arrTodoAfterDel}

        case CHANGE_TODOLIST:
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {...todo, title: action.title}
                }
            })
            return {...state, todolists: newTodolists}

        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id != action.todoListId) {
                        return todo
                    } else {
                        return {...todo, tasks: action.tasks}
                    }
                })
            }

        case ADD_TASK:
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {...todo, tasks: [action.newTask, ...todo.tasks]}
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


        case CHANGE_PRELOADER_TODO:
            return {...state, isPreloaderTodo: action.isPreloader}

        case CHANGE_PRELOADER_TASKS:
            return {...state, isPreloaderTasks: action.isPreloader}

        default:
            return state

    }
}
type TodoActionTypes =
    SetTodoListsSuccessType
    | AddTodolistSuccessType
    | DeleteTodoListSuccess
    | СhangeTodoListSuccess
    |
    SetTasksSuccessType
    | AddTaskSuccessType
    | DeleteTaskSuccessType
    | ChangeTaskSuccessType
    |
    ChangePreloaderTodoACType
    | ChangePreloaderTasksACType

/////ТИПЫ ДЛЯ ACTION CREATORS
type SetTodoListsSuccessType = {
    type: typeof SET_TODOLISTS
    todolists: Array<TodoType>
}
type AddTodolistSuccessType = {
    type: typeof ADD_TODOLIST
    newTodolistName: TodoType
}
type DeleteTodoListSuccess = {
    type: typeof DELETE_TODOLIST
    todolistId: string
}
type СhangeTodoListSuccess = {
    type: typeof CHANGE_TODOLIST
    todolistId: string
    title: string
}

type SetTasksSuccessType = {
    type: typeof SET_TASKS
    tasks: Array<TaskType>
    todoListId: string
}
type AddTaskSuccessType = {
    type: typeof ADD_TASK
    todolistId: string
    newTask: TaskType
}
type DeleteTaskSuccessType = {
    type: typeof DELETE_TASK
    todolistId: string
    taskId: string
}
type ChangeTaskSuccessType = {
    type: typeof CHANGE_TASK
    task: TaskType
}

type ChangePreloaderTodoACType = {
    type: typeof CHANGE_PRELOADER_TODO
    isPreloader: boolean
}
type ChangePreloaderTasksACType = {
    type: typeof CHANGE_PRELOADER_TASKS
    isPreloader: boolean
}

///// ACTION CREATORS
export const setTodoListsSuccess = (todolists: Array<TodoType>): SetTodoListsSuccessType => ({
    type: SET_TODOLISTS,
    todolists
})
export const addTodoListSuccess = (newTodolistName: TodoType): AddTodolistSuccessType => ({
    type: ADD_TODOLIST,
    newTodolistName: newTodolistName
})
export const deleteTodoListSuccess = (todolistId: string): DeleteTodoListSuccess => ({
    type: DELETE_TODOLIST,
    todolistId: todolistId
})
export const changeTodoListSuccess = (todoId: string, newtitle: string): СhangeTodoListSuccess => ({
    type: CHANGE_TODOLIST,
    todolistId: todoId,
    title: newtitle
})


export const setTasksSuccess = (tasks: Array<TaskType>, todoListId: string): SetTasksSuccessType => ({
    type: SET_TASKS,
    tasks,
    todoListId
})
export const addTaskSuccess = (todolistId: string, newTask: TaskType): AddTaskSuccessType => ({
    type: ADD_TASK,
    todolistId: todolistId,
    newTask: newTask
})
export const deleteTaskSuccess = (todolistId: string, taskId: string): DeleteTaskSuccessType => ({
    type: DELETE_TASK,
    todolistId: todolistId,
    taskId: taskId
})
export const changeTaskSuccess = (task: TaskType): ChangeTaskSuccessType => ({type: CHANGE_TASK, task: task})


export const changePreloaderTodoAC = (isPreloader: boolean): ChangePreloaderTodoACType => ({
    type: CHANGE_PRELOADER_TODO,
    isPreloader
})
export const changePreloaderTasksAC = (isPreloader: boolean): ChangePreloaderTasksACType => ({
    type: CHANGE_PRELOADER_TASKS,
    isPreloader
})


/////THUNKS
////from APP
export const getTodolists = () => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        dispatch(changePreloaderTodoAC(true))
        api.getTodolists()
            .then(res => {
                dispatch(setTodoListsSuccess(res.data))
                dispatch(changePreloaderTodoAC(false))
                // console.log(res.data);
            });
    }
}


export const addTodoList = (newTodolistName: string) => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        api.createTodolist(newTodolistName)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodoListSuccess(response.data.data.item))
                }
            })
    }
}

////from TodoList
export const deleteTodolist = (todoListId: string) => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        api.deleteTodolist(todoListId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    // debugger
                    dispatch(deleteTodoListSuccess(todoListId))
                }
            })
    }
}

export const changeTodolist = (todoListId: string, newtitle: string) => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        api.changeTodoTitle(todoListId, newtitle)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodoListSuccess(todoListId, newtitle))
                }
            })
    }
}

export const getTasks = (todoListId: string) => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        dispatch(changePreloaderTasksAC(true))
        api.getTasks(todoListId)
            .then(response => {
                console.log(response)
                if (!response.data.error) {
                    dispatch(setTasksSuccess(response.data.items, todoListId))
                    dispatch(changePreloaderTasksAC(false))
                }
            })
    }
}


export const addTask = (todoListId:string, newText:string) => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        api.createTask(todoListId, newText)
            .then(response => {
                if (response.data.resultCode === 0) {
                    let newTask = response.data.data.item;
                    dispatch(addTaskSuccess(todoListId, newTask))
                }
            })
    }
}

export const deleteTask = (todoListId:string, taskId:string) => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        api.deleteTask(todoListId, taskId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(deleteTaskSuccess(todoListId, taskId))
                }
            })
    }
}


export const changeTask = (task: TaskType, newPropsObj: UpadateTaskType) => {
    return (dispatch: Dispatch<TodoActionTypes>) => {
        api.changeTask(task, newPropsObj)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTaskSuccess(response.data.data.item))
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