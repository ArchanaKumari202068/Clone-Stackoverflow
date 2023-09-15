import mongoose from 'mongoose'
import Questions from '../models/Questions.js'

export const postAnswer = async(req,res) =>{
    //req.params typically represents the route parameters passed in a URL.
    //For example, if you have a route like /users/:id and a URL like /users/123, then 
    const {id:_id} =req.params;
    const {noOfAnswers,answerBody,userAnswered,userId} =req.body;
    console.log(noOfAnswers)

    // Check if the provided _id is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailabe...');
    }

    try {
        // Update the question by adding an answer to the 'answer' array using $addToSet
        const updatedQuestion = await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody, userAnswered, userId}]}})//userId:req.userId
        // Respond with the updated question

        res.status(200).json(updatedQuestion)
    } catch (error){
        res.status(400).json(error)    
    }   
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
        try {
            await Questions.findByIdAndUpdate(_id,{$set:{ 'noOfAnswers' :noOfAnswers},});
        }catch(error){
            console.log(error)

        }
}
// function to delete answer

export const deleteAnswer = async (req, res) => {
    const  {id:_id} =req.params;
    // when delete the specific ques also noOf ans will be change ex. 5 to 4
    const {answerId, noOfAnswers} = req.body;
//    { console.log("asdfghj")}

    // Check if the provided _id is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Invalid user id...');
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Invalid answer id...');
    }
    updateNoOfQuestions(_id,noOfAnswers)
    try{
        //just want to find particular ques and update only one value in that   
        await Questions.updateOne(
            {_id},
            //pull properties does it just matches the specific id in the ans array and it is just pull it out so it mmeans 
            //we r deleting the specific element in the answer array and update in the 
            //Questions database
            {$pull:{'answer':{_id:answerId}}}
        )
        res.status(200).json({message:"Successfully deleted..."})

    }catch(error){
        res.status(405)
    }

}