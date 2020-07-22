import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"},
    baseURL: "https://social-network.samuraijs.com/api/1.1/"
})


export const API = {
    checkAuth() {
        return instance.get(`auth/me`).then(res => res.data)
    },
    setAuth() {
        return instance.post(`auth/login`,
            {email:"dimatuz94@gmail.com", password:"dimatuzit309", rememberMe:false }
        ).then(res => res.data)
    },
    delAuth() {
        return instance.delete(`auth/login`).then(res => res.data)
    }
}