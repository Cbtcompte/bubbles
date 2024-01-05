
import Axios from "./caller.service"


export const getAllDiagramme = () => {
    return new Promise((resolve, reject) => {
        Axios.get('diagramme/get').then((response) => {
            if(response.status == 200){
                resolve(response.data)
            }else{
                console.log(response.data)
                reject(response)
            }
        }).catch((err) => {
            reject(err)
        })
    })
    
}