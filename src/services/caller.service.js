/**import des modules necessaires */

import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:9912/api/',
    headers: {
        'X-Requested-With' : 'XMLHttpRequest',
        'Authorization' : '',
        post : {
            'Content-Type' : 'application/x-www-form-urlencoded;application/json;multipart/form-data'
        }
    } 
})

export default Axios