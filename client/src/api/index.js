import axios from 'axios'
//creating an Axios instance named API with a base URL of http://localhost:5000.
const API = axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

//pass the auth Data to the post request to the backend 
export const logIn = (authData) => API.post('/user/login',authData);
export const signUp = (authData) => API.post('/user/signup',authData);

export const postQuestion=(questionData)=> API.post('/questions/Ask',questionData)
export const getAllQuestions =() => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)

export const postAnswer = (id,noOfAnswers,answerBody,userAnswered,userId) => API.patch(`/answer/post/${id}`,{noOfAnswers,answerBody,userAnswered,userId})
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers})
export const voteQuestion = (id,value,userId) => API.patch(`/questions/votes/${id}`,{value,userId})


export const fetchAllUsers =() => API.get('/user/getAllUsers')
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)
