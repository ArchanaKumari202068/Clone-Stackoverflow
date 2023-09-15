import React,{useState} from 'react'
// import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AskQuestion.css'
import {askQuestion} from '../../actions/question.js'

const AskQuestion = () => {
  const [questionTitle,setQusetionTitle]=useState('')
  const [questionBody,setQusetionBody]=useState('')
  const [questionTags,setQusetionTags]=useState('')

  const dispatch =useDispatch()
  const User =useSelector((state) =>(state.currentUserReducer))
  const navigate =useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log({questionTitle,questionBody,questionTags})
    //write action to dispatch
    dispatch(askQuestion({ questionTitle,questionBody,questionTags,userPosted: User.result.name,userId:User?.result._id}, navigate))
  }
  const handleEnter= (e) => {
    if (e.key === 'Enter'){
      setQusetionBody(questionBody + "\n")
    }
  }


  return (
   
    
    <>
    {
        // user === null ?
        // redirect():

        <div className="ask-question">
          <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <h1>{questionBody}</h1>
            <form onSubmit={handleSubmit}>
              <div className="ask-form-conatiner">
                <label htmlFor="ask-ques-title">
                  <h4>Title</h4>
                  <p>Be specific and imagine you’re asking a question to another person</p>
                  <input type="text"  id='ask-ques-title' onChange={(e) =>{setQusetionTitle(e.target.value)}} cols='130' placeholder='e.g. Is there an R function for finding the index of an element in a vector?'/>
                </label>
                <label htmlFor="ask-ques-body">
                  <h4>Body</h4>
                  <p>Include all the information someone would need to answer your question</p>
                  <textarea name='' id='ask-ques-body' onChange={(e) =>{setQusetionBody(e.target.value)}} onKeyPress={handleEnter}/>
                  
                </label>
                <label htmlFor="ask-ques-tags">
                  <h4>Tags</h4>
                  <p>Add up to 5 tags to describe what your question is about</p>
                  <input type="text"  id='ask-ques-tags' onChange={(e) =>{setQusetionTags(e.target.value.split(" "))}}  placeholder='e.g.(xml typescript wordpress)'/>
                </label>
              </div>
              <input type='submit' value='Review your question' className='review-btn'/>
            </form>
          </div>
           
        </div>
    }
    </>
  )
}

export default AskQuestion
