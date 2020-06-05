import axios from "axios";
import {TaskType, TodoType} from "./types/entities";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"},
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`
})



// type CreateTodoType = {
//     resultCode: number
//     messages: Array<string>
//     data: {
//         item: TodoType
//     }
// }
// type UpdateTaskType = {
//     resultCode: number
//     messages: Array<string>
//     data: {
//         item: TaskType
//     }
// }
//
// type DeleteTodoType={
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }


type CommonApiType<T>={
    resultCode: number
    messages: Array<string>
    data: T
}

const api = {
    createTodolist(newTodolistName:string) {
        return instance.post<CommonApiType<{item:TodoType}>>('', {title: newTodolistName}
        )
    },
    getTodolists() {
        return instance.get('')
    },

    getTasks(todolistId) {
        debugger
        return instance.get(
            `${todolistId}/tasks`,
        )
    },
    createTask(todolistId, newText) {
        return instance.post(`${todolistId}/tasks`,
            {title: newText}
        )
    },
    changeTask(task, newPropsObj) {
        return instance.put<CommonApiType<{item:TaskType}>>(
            `${task.todoListId}/tasks/${task.id}`,
            {...task, ...newPropsObj}
        )
    },
    deleteTodolist(todolistId) {
        return instance.delete<CommonApiType<{}>>(
            `${todolistId}`
        )
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`${todolistId}/tasks/${taskId}`
        )
    },

    changeTodoTitle(todolistId, newtitle) {
        return instance.put(
            `${todolistId}`,
            {title: newtitle}
        )
    }
}

export default api;