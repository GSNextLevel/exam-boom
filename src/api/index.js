import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'https://kzutk1y9w7.execute-api.ap-northeast-2.amazonaws.com/v1/exam'
})

export const getExamById = (type, id, username) => api.get(`/${type}/${id}?username=${username}`)
export const getAllExamAnswer = (type, front, end) => api.get(`/${type}/getanswer?front=${front}&end=${end}`)
export const getExamReplyById = (type, id) => api.get(`/${type}/${id}/reply`)
export const updateExamReplyById = (type, id, payload) => api.put(`/${type}/${id}/reply`, payload)
export const deleteExamReplyById = (type, id, username, replyIdx) => api.delete(`/${type}/${id}/reply?username=${username}&replyIdx=${replyIdx}`)

export const scoringExam = (type, payload) => api.post(`/${type}/scoring`, payload)
export const likeExamById = (type, id, payload) => api.post(`/${type}/${id}/like`, payload)

export const getPreviousExamByType = (type) => api.get(`/${type}/getprevious`)

const apis = {
    getExamById,
    getAllExamAnswer,
    getExamReplyById,
    updateExamReplyById,
    scoringExam,
    deleteExamReplyById,
    likeExamById,
    getPreviousExamByType
}

export default apis
