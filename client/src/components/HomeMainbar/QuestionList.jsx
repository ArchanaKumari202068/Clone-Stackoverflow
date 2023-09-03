import React from "react";
import Questions from "./Questions";

const QuestionList = ({ questionList }) => {
  // console.log(questionList)
  return (
    <>
      {
        questionList.map((question)=>(
          <Questions question={question} key={question._id}/>
        ))
      }
      
    </>
  );
};

export default QuestionList;
