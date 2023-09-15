import Questions from '../models/Questions.js'
import mongoose from 'mongoose'
// func to ask the Question
export const AskQuestion =async(req,res)=>{
    const userId = req.userId;
    const postQuestionData=req.body;
   
    const postQuestion= new Questions({...postQuestionData});  //({...postQuestionData,userId:req.userId})
    console.log(req.body)
    try {
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
    } catch (error){
       console.log(error)
       res.status(409).json("Couldn't post a new question") 
    } 
}
//func to get all the question
export const getAllQuestions =async(req,res) =>{
    try{
        const questionList = await Questions.find();
        res.status(200).json(questionList);

        
    }catch(error){
        res.status(404).json({message: error.message});
    }
}
//func to delete question
export const deleteQuestion =async ( req, res) => {
    //first retrieve the data
    const { id :_id } = req.params;
    //is the valid mongoose Type Id
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailabe...');
    }

    try {
        //Questions is a schema here
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({message:"successfully deleted..."})


    } catch (error){
        res.status(404).json({message:error.message})

    }
}

// function for Vote

export const voteQuestion =async (req,res) => {
    const {id:_id} =req.params;
    const {value,userId} = req.body;
    
    //is the valid mongoose Type Id
    if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).send('question unavailabe...');
    }
    try {
        const question = await Questions.findById(_id)
        //if the id matches with the element inside the upVote.findinde(id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        //user id is already present in downvote
        const downIndex = question.downVote.findIndex((id) => id === String(userId))
        if(value === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id)=>id !==String(userId))
            }
            if(upIndex === -1){
                question.upVote.push(userId)
            }else{
                question.upVote = question.downVote.filter((id) => id != String(userId))
            }
        }
        else if(value === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id)=>id !==String(userId))
            }
            if(downIndex === -1){
                question.downVote.push(userId)
            }else{
                question.downVote = question.upVote.filter((id) => id != String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id,question)
        res.status(200).json({message:"voted successfully..."})
    } catch(error){
        res.status(404).json({message:"id not found"})
        console.log(error)
    }
    
}