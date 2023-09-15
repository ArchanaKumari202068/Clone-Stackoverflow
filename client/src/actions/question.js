// import React from 'react'
import  * as api from '../api'

export const askQuestion=(questionData,navigate) => async (dispatch) =>{
    try{
        const {data} = await api.postQuestion(questionData)
        //payload is nothing bt data 

        dispatch({type:"POST_QUESTION",payload:data})
        dispatch(fetchAllQuestions())
        navigate('/')
    }catch (error){
        console.log(error)

    }
}
//write actions which one is use that axios to get the data to the database
//fetch all questions

export const fetchAllQuestions =() => async (dispatch) =>{
    try{
        console.log("fetched data")
        const {data} = await api.getAllQuestions()
        dispatch({type:'FETCH_ALL_QUESTIONS',payload:data})
    }catch(error){
        console.log(error)

    }
}

// write a specific action to delete a particular question

export const deleteQuestion = (id,navigate) => async (dispatch) => {
    try {
        const {data} = api.deleteQuestion(id)
        dispatch(fetchAllQuestions)
        //navigate use here bcoz when deleted the question then wanted to route on the home page
        navigate('/')
         

    } catch (error) {
        console.log(error)

    }
}
//to post ans postAnswer fun will be trigger
export const postAnswer =(answerdata) => async (dispatch) => {
    try{
    const {id,noOfAnswers,answerBody,userAnswered,userId} = answerdata;
    //send the data to the backend
    const {data} =await api.postAnswer(id, noOfAnswers,answerBody,userAnswered,userId);
    dispatch({type:'POST_ANSWER',payload:data})
    dispatch(fetchAllQuestions);
    } catch(error){
        console.log(error)
    }
}

//answer function

export const deleteAnswer = ( id, answerId, noOfAnswers) => async (dispatch) => {
    try {
        const { data } = await api.deleteAnswer(id, answerId, noOfAnswers)
        dispatch(fetchAllQuestions)
    } catch(error){
        console.log(error)
    }
}

// Vote function

export const voteQuestion = (id,value, userId) => async (dispatch) => {
    try{
        const { data } = await api.voteQuestion(id,value, userId)
        dispatch(fetchAllQuestions)
    } catch(error){
        console.log(error)
    }
}
