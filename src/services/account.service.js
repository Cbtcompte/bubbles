
import Axios from "./caller.service"


let login = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post('user/login', data).then((response) => {
            if(response.status == 200){
                resolve(response)
            }else{
                reject(response)
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

let register = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post('user/register', data).then((response) => {
            console.log(response)
            if(response.status == 200){
                resolve(response)
            }else{
                reject(response)
            }
        }).catch((error) => {
            reject(error)
        })
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
    register,
    logout,
    saveToken,
    isLogged
}