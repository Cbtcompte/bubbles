
import Axios from "./caller.service"


let login = (data) => {
    Axios.post('auth/login', data).then((response) => {
        console.log(response)
    })
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