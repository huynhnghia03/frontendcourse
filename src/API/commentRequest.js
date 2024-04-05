import axios from "axios";
;

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

export const getComment = (type, courseID, page, replyID) => API.get('/api/comment/get', {
    headers: {
        'token': localStorage.getItem('token')
    },
    params: {
        type,
        courseID,
        page,
        replyID
    }
})
export const createComment = (data) => API.post('/api/comment/create', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})
export const createReactionComment = (id, data) => API.post('/api/comment/' + id + '/reactions', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const editComment = (id, data) => API.put('/api/comment/' + id + '/update', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})

export const deleteCommentParent = (id) => API.delete('/api/comment/' + id + '/deleteParent', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const deleteCommentChildren = (firstID, secondID) => API.delete('/api/comment/' + firstID + '/' + secondID + '/delete', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const uploadimage = (data) => API.post('/api/comment/upload/image', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})