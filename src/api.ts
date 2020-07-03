import axios from "axios";
import {TaskType, TodoType, UpadateTaskType} from "./types/entities";

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

///описываем, что нам возвращает сервер из апишки в промисе
type CommonApiType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

type GetTaskType={
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

const api = {

    getTodolists() {
        return instance.get<Array<TodoType>>(
            '')
    },
    createTodolist(newTodolistName: string) {
        return instance.post<CommonApiType<{ item: TodoType }>>(
            '',
            {title: newTodolistName}
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonApiType<{}>>(
            `${todolistId}`
        )
    },
    changeTodoTitle(todolistId: string, newtitle: string) {
        return instance.put<CommonApiType<{ item: TodoType }>>(
            `${todolistId}`,
            {title: newtitle}
        )
    },

    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(
            `${todolistId}/tasks`,
        )
    },
    createTask(todolistId: string, newText: string) {
        return instance.post<CommonApiType<{ item: TaskType }>>(`${todolistId}/tasks`,
            {title: newText}
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonApiType<{}>>(`${todolistId}/tasks/${taskId}`
        )
    },
    changeTask(task: TaskType, newPropsObj: UpadateTaskType) {
        return instance.put<CommonApiType<{ item: TaskType }>>(
            `${task.todoListId}/tasks/${task.id}`,
            {...task, ...newPropsObj}
        )
    }
}

export default api;