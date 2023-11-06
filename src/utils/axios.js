import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

export default myAxios;