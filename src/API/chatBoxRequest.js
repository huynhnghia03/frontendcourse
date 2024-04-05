import axios from "axios";
;

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })


//chat
export const getAllMemberChats = (id) => API.get('/api/chat/getAllMemembers/' + id + '', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const getUserChat = (id) => API.get('/api/chat/getUserChat/' + id + '', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const createChatWithAdmin = (data) => API.post('/api/chat/create', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})
export const createChatWithUser = (data) => API.post('/api/chat/OwnChat', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})
//message

export const getUserMessage = (id) => API.get('/api/message/getUserMessage/' + id + '', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const createMessage = (data) => API.post('/api/message/create', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})