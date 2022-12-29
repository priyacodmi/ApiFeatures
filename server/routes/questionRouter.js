const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const questionService = require("../services/questionServices");
const Question = require("../models/Questions");
const User = require("../models/User");
const roleServices = require("../services/roleService");
const Role = require("../models/Roles");
/*
  Usage : to create questions(for client only)
  URL : /api/question/createQuestion
  @fields : questionText , options
  @method : POST
  @access : private
*/

router.post("/createQuestions", authenticate, async (req, res) => {
  try {

    let { questionText, options,correctOption } = req.body;
    const user = await User.findOne({ _id: req.user.id });
    let userIdentity = await roleServices.getRoleById(user.role.toString());

    if (userIdentity.name !== "client") {
      return res
        .status(400)
        .json({ errors: [{ msg: "Only client can generate question" }] });
    }

    let questionObject = {
      questionText: questionText,
      options: options
        .toString()
        .split(",")
        .map((option) => option.trim()),
        correctOption:correctOption.toString()
        .split(",")
        .map((option) => option.trim()),
    };

    questionObject = await questionService.returnQuestionObj(questionObject);
    questionObject = await questionService.saveQuestions(questionObject);

    res.status(200).json({
      msg: "question save successfully",
      question: questionObject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage : to delete question by questions(for client only)
  URL : /api/question//deleteQuestion/:quesId
  @fields : NO-FIELDS
  @method : DELETE
  @access : private
*/

router.delete(
  "/deleteQuestion/:quesId",
  authenticate,
  async (req, res) => {
    try {
      let questionId = req.params.quesId;
      const user = await User.findOne({ _id: req.user.id });
      let userIdentity = await roleServices.getRoleById(user.role.toString());

      if (userIdentity.name !== "client") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Only client can delete  questions" }] });
      }

      //check if question is exist or not
      let question = await questionService.getQuestionsByQuesId(questionId);

      if (!question) {
        return res
          .status(400)
          .json({ errors: [{ msg: "No question available for this id" }] });
      }

      question = await Question.findByIdAndRemove(questionId);

      res
        .status(200)
        .json({ msg: "Question is deleted", question: question });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/*
  Usage : to get all questions
  URL : /api/question/all
  @fields : no -field
  @method : GET
  @access : private 
*/

router.get('/all',authenticate,async(req,res)=>{
    
  try {

    const user = await User.findOne({ _id: req.user.id });
    if(!user) {
      return res.status(401).json({errors : [{msg: 'user does not exist'}]})
    }
    const userRole = await Role.findOne({_id : user.role.toString()});

    if(userRole.name === "user") {
      return res
          .status(400)
          .json({ errors: [{ msg: "user have not access to get all the questions" }] });
    }

    let questions = await questionService.getAllQuestions();
      if(!questions){
        return res.status(400).json({errors:[{msg:"No Questions Found"}]});
      }
      res.status(200).json({questions:questions})
   }catch (error) {
    console.log(error);
    res.status(500).json({errors : [{msg : error.message}]}); 
   }
});

/*
  Usage : to get all questions by users
  URL : /api/question/all/users
  @fields : no -field
  @method : GET
  @access : private 
*/

router.get('/all/users',authenticate,async(req,res)=>{
    
  try {
    const user = await User.findOne({ _id: req.user.id });
    if(!user) {
      return res.status(401).json({errors : [{msg: 'user does not exist'}]})
    }
    
    let questions = await questionService.getAllQuestionsByUser();
      if(!questions){
        return res.status(400).json({errors:[{msg:"No Questions Found"}]});
      }
      res.status(200).json({msg:'success',questions:questions})
   }catch (error) {
    console.log(error);
    res.status(500).json({errors : [{msg : error.message}]}); 
   }
});


/*
  Usage :to update a question
  URL : /api/question/update
  @fields : no -field
  @method : GET
  @access : private
*/


router.put('/update/:quesId',authenticate,async(req,res)=>{
  try {
    let {questionText,options}= req.body;
    const user = await User.findOne({ _id: req.user.id });
    let quesId = req.params.quesId;
    if(!user) {
      return res.status(401).json({errors : [{msg: 'user does not exist'}]})
    }

    const userRole = await Role.findOne({_id : user.role.toString()});

    if(userRole.name === "user") {
      return res
          .status(400)
          .json({ errors: [{ msg: "Only client have right to update the questions" }] });
    }
    
    const requiredQuesiton = await questionService.getQuestionsByQuesId(quesId);

   let updatedQuesObject = {
    questionText:questionText?questionText:requiredQuesiton.questionText,
    options:options?options:requiredQuesiton.requiredQuesiton
   }
   updatedQuesObject = await Question.findOneAndUpdate({_id :quesId } , {
    $set : updatedQuesObject
   },{new :true});

   res.status(200).json({
    msg: 'question Updated Successfully',
    user:updatedQuesObject
   })

  }catch (error){
    console.log(error);
    res.status(500).json({errors : [{msg : error.message}]}); 
  }
});

module.exports = router;
