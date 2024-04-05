import axios from "axios";
;

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

export const getComment = (type, courseID, page, replyID) => API.get('/api/commentBlog/get', {
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
export const createComment = (data) => API.post('/api/commentBlog/create', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})
export const editComment = (id, data) => API.put('/api/commentBlog/' + id + '/update', {
    headers: {
        'token': localStorage.getItem('token')
    }, data
})

export const deleteCommentParent = (id) => API.delete('/api/commentBlog/' + id + '/deleteParent', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const deleteCommentChildren = (firstID, secondID) => API.delete('/api/commentBlog/' + firstID + '/' + secondID + '/delete', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const uploadimage = (data) => API.post('/api/commentBlog/upload/image', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const createReactionComment = (id, data) => API.post('/api/commentBlog/' + id + '/reactions', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})