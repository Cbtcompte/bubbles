
import Axios from "./caller.service"


let login = (Credentials) => {
    return Axios.post('/auth/loginView', Credentials)
}

let logout = () => {
    localStorage.removeItem('token')
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const accountService = {
    login,
    logout,
    saveToken,
    isLogged
}