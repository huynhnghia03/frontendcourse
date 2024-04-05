import axios from "axios";


const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

export const getAllBlogs = (page) => API.get('/api/blog/getAllBlogs', {
    headers: {
        'token': localStorage.getItem('token')
    },
    params: {
        page
    }
})
export const getDetailBlog = (slug) => API.get('/api/blog/getDetail/' + slug + '', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const getDetailBlogPrivate = (id) => API.get('/api/blog/' + id + '/show-for-edit')
export const getOwnBlogs = () => API.get('/api/blog/own/my-bolgs', {
    headers: {
        'token': localStorage.getItem('token')
    }
})

export const createBlog = (data) => API.post('/api/blog/create', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const createReactBlog = (id) => API.post('/api/blog/' + id + '/reactions', {
    headers: {
        'token': localStorage.getItem('token')
    }
})

export const updateBlog = (id, data) => API.put('/api/blog/update/' + id + '', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const updateSavePublishedBlog = (id, data) => API.post('/api/blog/' + id + '/save-published', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const deleteBlog = (slug) => API.delete('/api/blog/' + slug + '/delete', {
    headers: {
        'token': localStorage.getItem('token')
    }
})
export const uploadimage = (data) => API.post('/api/blog/image/upload', data, {
    headers: {
        'token': localStorage.getItem('token')
    }
})