import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'https://api.viassh.com',
    // baseURL: 'https://testapi.viassh.com',
    headers: {
              "x-api-key": process.env.REACT_APP_AWS_API_KEY
            }
})


export const getExamById = (type, id, username) => api.get(`/exam/${type}/${id}?username=${username}`)
export const getAllExamAnswer = (type, front, end) => api.get(`/exam/${type}/getanswer?front=${front}&end=${end}`)
export const getExamReplyById = (type, id) => api.get(`/exam/${type}/${id}/reply`)
export const updateExamReplyById = (type, id, payload) => api.put(`/exam/${type}/${id}/reply`, payload)
export const deleteExamReplyById = (type, id, username, replyIdx) => api.delete(`/exam/${type}/${id}/reply?username=${username}&replyIdx=${replyIdx}`)
export const getRecentReply = () => api.get(`/exam/all/0/reply`)

export const scoringExam = (type, payload) => api.post(`/exam/${type}/scoring`, payload)
export const getExamHistory = (type, username) => api.get(`/exam/${type}/scoring?username=${username}`)

export const likeExamById = (type, id, payload) => api.post(`/exam/${type}/${id}/like`, payload)

export const getPreviousExamByType = (type) => api.get(`/exam/${type}/getprevious`)

export const getLeaderBoard = (type) => api.get("/leaderboard")

const apis = {
    getExamById,
    getAllExamAnswer,
    getExamReplyById,
    updateExamReplyById,
    scoringExam,
    deleteExamReplyById,
    likeExamById,
    getPreviousExamByType,
    getLeaderBoard,
    getExamHistory
}

export default apis
