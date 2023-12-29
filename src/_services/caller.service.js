/**import des modules necessaires */

import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:5173/'
})

export default Axios