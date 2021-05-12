import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'https://kzutk1y9w7.execute-api.ap-northeast-2.amazonaws.com/v1/exam'
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

export const getExamById = (type, id) => api.get(`/${type}/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getExamById
}

export default apis
