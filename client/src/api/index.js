import axios from 'axios'
//creating an Axios instance named API with a base URL of http://localhost:5000.
const API = axios.create({baseURL:'http://localhost:5000'})

//pass the auth Data to the post request to the backend 
export const logIn = (authData) => API.post('/user/login',authData);
export const signUp = (authData) => API.post('/user/signup',authData);

export const postQuestion=(questionData)=> API.post('/questions/Ask',questionData)
export const getAllQuestions =() => API.get('/questions/get');