import axios from "axios";
;

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })
//auth
export const LoginMedthod = (data) => API.post('/api/auths/login', { data })
export const RegisterMedthod = (data) => API.post('/api/auths/resgister', { data })
//oauth02
export const LoginOauth = (data, method) => API.post(`/api/authO2/${method}/success`, { data })
export const interactiveWithOauth = (data, method, type) => API.put(`/api/authO2/${method}/${type}`, { data }, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const checkPhone = (data) => API.get(`/api/authO2/phone/${data}/check`, {
    headers: {
        'token': localStorage.getItem('token')
    }
})