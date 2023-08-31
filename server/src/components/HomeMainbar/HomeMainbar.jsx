import React from 'react'
import { Link, useLocation} from 'react-router-dom'
import '../HomeMainbar/HomeMainbar.css'
import { useNavigate } from 'react-router-dom'

// import Questions from '../../pages/Questions/Questions'

import QuestionList from './QuestionList'

const HomeMainbar = () => {
const location=useLocation()
const user = 1;
const navigate = useNavigate()
  var questionList=[{
    _id:1,
    upVotes:3,
    downVotes:2,
    noOfAnswer:2,
    questionTitle:"What is a function",
    questionBody:"It mean to be",
    questionTags:["java","node.js","react js","mongodb"],
    userPosted:"mano",
    userId:1,

    askedOn:"jan 1",
    answer :[{
      answerBody:'Answer',
      userAnswered:'kumar',
      answerOn:"jan 2"
    }]


  },
  {
    _id:2,
    upVotes:3,
    downVotes:2,
    noOfAnswer:0,
    questionTitle:"What is a function",
    questionBody:"It mean to be",
    questionTags:["javascript","R","python"],
    userPosted:"mano",
    askedOn:"jan 1",
    userId:1,
    answer :[{
      answerBody:'Answer',
      userAnswered:'kumar',
      answerOn:"jan 2"
    }]




  },
  {
    id:3,
    upVotes:3,
    downVotes:2,
    noOfAnswer:2,
    questionTitle:"What is a function",
    questionBody:"It mean to be",
    questionTags:["java","node.js","react js","mongodb"],
    userPosted:"mano",
    askedOn:"jan 1",
    userId:1,
    answer:[{
      answerBody:"Answer",
      userAnswered:"kumar",
      answerOn:"jan 2",
      userId:2,

    }]

  }]


// const redirect = () => {
//     alert("login or signup to ask a question ")
//     navigate('/Auth')


// }

const checkAuth=()=>{
  if(user===null){
    alert("login or signup to askk a question")
    navigate('/Auth')
  }else{
    navigate('/Askquestion')
  }

}


  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          //location is object and pathname is variable
          location.pathname ==='/' ?(<h1>Top Questions</h1> ):(<h1>All Questions</h1>)
        }
        <button to='/AskQuestion' onClick ={checkAuth} className='ask-btn'>Ask Question</button>

      </div>
      <div>
        {
          questionList === null?
          <h1>Loading...</h1>:
          <>
            <p>{ questionList.length} questions</p>
            
            <QuestionList questionList={questionList}/>
          </>
        }
      </div>


    </div>
  )
}

export default HomeMainbar