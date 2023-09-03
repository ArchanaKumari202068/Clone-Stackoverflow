// import React from 'react'
import  * as api from '../api'

export const askQuestion=(questionData,navigate) => async (dispatch) =>{
    try{
        const {data} = await api.postQuestion(questionData)
        //payload is nothing bt data 

        dispatch({type:"POST_QUESTION",payload:data})
        navigate('/')
    }catch (error){
        console.log(error)

    }
}
//write actions which one is use that axios to get the data to the database
//fetch all questions

export const fetchAllQuestions =() => async (dispatch) =>{
    try{
        const {data} = await api.getAllQuestions()
        dispatch({type:'FETCH_ALL_QUESTIONS',payload:data})
    }catch(error){
        console.log(error)

    }
}

