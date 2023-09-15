import React ,{ useState } from 'react'
import {useParams,Link, useNavigate,useLocation} from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux'
import upvotes from '../../assest/sort-up.svg'
import downvotes from '../../assest/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { postAnswer,deleteQuestion,voteQuestion } from '../../actions/question.js'
import copy from 'copy-to-clipboard'
// import { deleteQuestion } from '../../actions/question'

const QuestionsDetails = () => {
    const { id } =useParams()
    const questionsList= useSelector(state => state.questionsReducer)
    // console.log(id)
    // var questionList=[{
    //     _id:'1',
    //     upVote:3,
    //     downVotes:2,
    //     noOfAnswer:2,
    //     questionTitle:"What is a function?",
    //     questionBody:"It mean to be",
    //     questionTags:["java","node.js","react js","mongodb"],
    //     userPosted:"mano",
    //     userId:1,
    
    //     askedOn:"jan 1",
    //     answer :[{
    //       answerBody:'Answer',
    //       userAnswered:'kumar',
    //       answerOn:"jan 2"
    //     }]
    
    
    //   },
    //   {
    //     _id:'2',
    //     upVote:3,
    //     downVotes:2,
    //     noOfAnswer:0,
    //     questionTitle:"What is a function?",
    //     questionBody:"It mean to be",
    //     questionTags:["javascript","R","python"],
    //     userPosted:"mano",
    //     askedOn:"jan 1",
    //     userId:1,
    //     answer :[{
    //       answerBody:'Answer',
    //       userAnswered:'kumar',
    //       answerOn:"jan 2"
    //     }]
    
    
    
    
    //   },
    //   {
    //     id:'3',
    //     upVote:3,
    //     downVotes:2,
    //     noOfAnswer:2,
    //     questionTitle:"What is a function?",
    //     questionBody:"It mean to be",
    //     questionTags:["java","node.js","react js","mongodb"],
    //     userPosted:"mano",
    //     askedOn:"jan 1",
    //     userId:1,
    //     answer:[{
    //       answerBody:"Answer",
    //       userAnswered:"kumar",
    //       answerOn:"jan 2",
    //       userId:2,
    
    //     }]
    
    //   }]

    const [Answer,setAnswer] =useState('')
    const Navigate =useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state)=>(state.currentUserReducer))
    const location =useLocation()
    const url = 'http://localhost:3000/'

    console.log(location)

    const handlePostAns = (e, answerLength) =>{
        e.preventDefault()
        //condition to eligilbe to submit ans
        if(User ===null){
            alert('Login or signup to answer a question ')
            Navigate('/Auth')

        }else{
            if(Answer === ''){
                alert('Enter an answer before submiiting')
            }else{
                //answerLength +1 bcoz we r pushing new ans
            dispatch(postAnswer({id,noOfAnswers:answerLength + 1,answerBody:Answer,userAnswered:User.result.name,userId:User.result._id}))
            }
        }

    }
    //by clicking share function we will call the handleshare
  const handleShare = () => {
    copy(url+location.pathname)
    alert('Copied url : '+url+location.pathname)

  }

  const handleDelete = () => {
    dispatch(deleteQuestion(id,Navigate))
  }


  const handleUpVote = ()=>{
    dispatch(voteQuestion(id,'upVote',User.result._id))

  }
  const handleDownVote = () =>{
    dispatch(voteQuestion(id,'downVote',User.result._id))
  }

  return (
    <div className='question-details-page'>
        {
            questionsList.data ===null ? (
        
        <h1>Loading...</h1>
        ):(
        <>
        {
            questionsList.data.filter(question=> question._id ===id).map(question => (
                <div key={question._id}>
                    {console.log(question)}
                    <section className='question-details-container'>
                        <h1>{question.questionTitle}</h1>
                        <div className='votes-tags'>
                            <div className='question-details-container-2'>
                                <img src={upvotes} alt="" width='18' className='votes-icon' onClick={handleUpVote}/>
                                <p>{question.upVote.length- question.downVote.length}</p>
                                <img  src={downvotes} alt='' width='18'  className='votes-icon' onClick={handleDownVote} />
                            </div>
                            <div style={{width:"100%"}}>
                                <p className='question-body'>{question.questionBody}</p>
                                <div className="question-details-tags">
                                    {
                                        question.questionTags.map((tag) =>(
                                            <p key={tag}>{tag}</p>
                                        ))
                                    }
                                </div>
                                <div className="question-actions-user">
                                    <div>
                                        <button type='button' onClick={handleShare}>Share</button>
                                        {
                                            // if the login id match with the question id then they r able to delete
                                            User?.result?._id === question?.userId && (
                                                <button type='button' onClick={handleDelete}>Delete</button>
                                            )
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>asked{question.askedOn}</p>
                                        <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                            <Avatar backgroundColor='orange' px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                            <div>
                                                {question.userPosted}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {
                        question.answer.length !==0 &&(
                            <section>
                                <h3>{question.answer.length} Answers</h3>
                                <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                            </section>

                        )
                    }
                    <section className='post-ans-container'>
                        <h3>Your Answer</h3>
                        <form onSubmit={(e) =>handlePostAns(e,question.answer.length)}>
                            <textarea name='' id='' cols='30' rows='10' onChange={e=>setAnswer(e.target.value)}></textarea>
                            <input  type='Submit' className='post-ans-btn' value='Post Your Answer'/>
                       </form>
                       <p>
                        Browser other Question tagged
                        {
                            question.questionTags.map((tag)=>(
                                <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                            ))
                        } or 
                        <Link to='/AskQuestion' style={{textDecoration: 'none',color:'#009dff'}}>ask your own questions</Link>
                       </p>
                    </section>
                </div>
            ))
        }
        </>
        )}
    </div>
  )
}

export default QuestionsDetails