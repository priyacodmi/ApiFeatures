const Result = require("../models/Result");
const questionServices = require("../services/questionServices");

const saveResult = (result) => {
  return result.save();
};

const returnResultObj = (result) => {
  return new Result(result);
};

const createUserAnswerWithCorrectAnswer = (selectedQuestions, questionId) => {
  let combined = questionId.map((item) => ({
    ...item,
    question: selectedQuestions.filter((f) => f._id.toString() === item.id)[0]
      ?.questionText,
      correctOptions: selectedQuestions.filter((f) => f._id.toString() === item.id)[0]
      ?.correctOption
  }));

  return combined;
};

const getQuestionAnswerByQuestionId = async (questions) => {
  let allQuestions = await questionServices.getAllQuestions();
  let res = [];
  res = allQuestions.filter((el) => {
    return questions.find((element) => {
      return element.id === el.id.toString();
    });
  });

  return res;
};

const returnIdObject = (selectedQuestions, questionId) => {
  let combined = questionId.map((item) => ({
    ...item,
    question:selectedQuestions.filter((f) => f._id.toString() === item.id)[0]
    ?._id,
  }));

  return combined;
};

const getResultByresultId = async(resultId)=>{
  let result =  await Result.findOne({_id:resultId.toString()}).populate('trails',['trailName']);
  if(result){
    return result
  }else {
    return false
  }
};

const resultService = {
  saveResult,
  returnResultObj,
  createUserAnswerWithCorrectAnswer,
  getQuestionAnswerByQuestionId,
  getResultByresultId,
  returnIdObject
};
module.exports = resultService;
