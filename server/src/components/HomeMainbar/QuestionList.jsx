import React from "react";
import Questions from "./Questions";

const QuestionList = ({ questionList }) => {
  // console.log(questionList)
  return (
    <>
      {questionList?.map((question)=>{
        return <Questions question={question} />
      })}
      
    </>
  );
};

export default QuestionList;
