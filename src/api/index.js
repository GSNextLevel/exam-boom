import axios from 'axios'
import { API_BASE_URL } from '../app-config'

const api = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'https://api.viassh.com',
    // baseURL: 'https://testapi.viassh.com',
    headers: {
              "x-api-key": "R2Jp0nUFcr6OoxVx1Ro4Z5WaD2IVzxz29164U4Sk"
              // process.env.REACT_APP_AWS_API_KEY
            }
})

const api2 = axios.create({
    
    // baseURL: 'https://3.38.150.150',
    // baseURL: 'https://test.viassh.com',
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("userToken")
        //  eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YWE2MDk5YjdkNGNjNTNjMDE3ZDRjYzU1YTRiMDAwMCIsImlzcyI6ImV4YW1ib29tIiwiaWF0IjoxNjM3OTk0MjY2LCJleHAiOjE2Mzg4NTgyNjZ9.Bs86cQcURn08i8goE7d6D4IFMMvh6A13THtcP21tBns"
    }

})

console.log("after index.js ", API_BASE_URL);

export const getExamById = (type, id, username) => api2.get(`/api/exam/${type}/${id}?username=${username}`)

// export const getExamById = (type, id, username) => api.get(`/exam/${type}/${id}?username=${username}`)
export const getAllExamAnswer = (type, front, end) => api.get(`/exam/${type}/getanswer?front=${front}&end=${end}`)

export const getExamReplyById = (type, id) => api2.get(`/api/exam/${type}/${id}/reply`)
// export const getExamReplyById = (type, id) => api.get(`/exam/${type}/${id}/reply`)


// export const updateExamReplyById = (type, id, payload) => api.put(`/exam/${type}/${id}/reply`, payload)
export const updateExamReplyById = (type, id, payload) => api2.post(`/api/exam/${type}/${id}/reply`, payload)
export const deleteExamReplyById = (type, id, reply_id) => api2.delete(`/api/exam/${type}/${id}/reply/${reply_id}`)

// export const getRecentReply = () => api.get(`/exam/all/0/reply`)
export const getRecentReply = () => api2.get(`/api/exam/reply/recent`)

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

// export const login = (email,password) => api.get("/login", {auth: {username: email, password:password}})
export const login = (email,password) => api2.post("/api/auth/signin", {email: email, password: password})

export const signup = (payload) => api2.post("/api/auth/signup", payload)

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
    login,
    signup
}

export default apis
