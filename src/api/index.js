import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3000/api',
    // baseURL: 'https://api.viassh.com',
    baseURL: 'https://testapi.viassh.com',
    headers: {
              "x-api-key": "R2Jp0nUFcr6OoxVx1Ro4Z5WaD2IVzxz29164U4Sk"
              // process.env.REACT_APP_AWS_API_KEY
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

export const getLeaderBoard = () => api.get("/leaderboard")

export const addPreviousExam = (type, id, payload) => api.post(`/exam/${type}/${id}/previousexam`, payload)

export const slackSendVoC = (payload) => api.post("/slack/msg", payload)

// member
export const putUser = (payload) => api.put("/user", payload)
export const getUser = (email) => {
    let {token} = JSON.parse(localStorage.getItem("userToken"));
    return api.get(`/user/${email}`, {headers: {"Authorization": `Bearer ${token}`}});
}

export const login = (email,password) => api.get("/login", {auth: {username: email, password:password}})


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
    getExamHistory,
    getRecentReply,
    addPreviousExam,

    slackSendVoC,
    putUser,
    getUser,
    login
}

export default apis
