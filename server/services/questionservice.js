const Question = require("../models/Questions");

const saveQuestions = (question) => {
  return question.save();
};

const returnQuestionObj = (question) => {
  return new Question(question);
};

const getQuestionsByUserId = async (userId) => {
  let questions = await Question.findOne({ user: userId });
  if (questions) {
    return questions;
  } else {
    return false;
  }
};

const getQuestionsByQuesId = async (quesId) => {
  let questions = await Question.findOne({ _id: quesId.toString() });
  if (questions) {
    return questions;
  } else {
    return false;
  }
};

const getQuestionByIdForTrails = (allQuestions, questionsId) => {
  const allSelectedQuestions = allQuestions.filter(function (item) {
    return (
      questionsId.indexOf(
        item._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
      ) !== -1
    );
  });
  if (allSelectedQuestions.length > 0) {
    return allSelectedQuestions;
  } else {
    return false;
  }
};

const getAllQuestions = async () => {
  let questions = await Question.find();
  if (questions) {
    return questions;
  } else {
    return false;
  }
};

const getAllQuestionOptionOnly = async () => {
  let questions = await Question.find()
    .select("-correctOption")
    .select("-createdAt")
    .select("-updatedAt")
    .select("-__v")
    .select("-attemptedUser");
  if (questions) {
    return questions;
  } else {
    return false;
  }
};

const getAllQuestionsByUser = async()=>{
  let questions = await Question.find().select('-correctOption').select("-createdAt")
  .select("-updatedAt")
  .select("-__v");
  if (questions) {
    return questions;
  } else {
    return false;
  }
};

const quesService = {
  saveQuestions,
  returnQuestionObj,
  getQuestionsByUserId,
  getAllQuestions,
  getQuestionsByQuesId,
  getQuestionByIdForTrails,
  getAllQuestionOptionOnly,
  getAllQuestionsByUser
};
module.exports = quesService;
