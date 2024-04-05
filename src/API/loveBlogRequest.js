import axios from "axios";
;

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })
//loveblog
export const createLoveBlog = (id) => API.post(`/api/bookMark/toggle-bookmark/${id}`, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const getLoveBlogs = () => API.get(`/api/bookMark/saved`, {
    headers: {
        'token': localStorage.getItem('token')
    }
})