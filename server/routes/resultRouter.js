const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const resultService = require("../services/resultServices");
const roleServices = require("../services/roleService");
const User = require("../models/User");
const Role = require("../models/Roles");
const Trail = require("../models/Trails");
const Result = require("../models/Result");

/*
  Usage :to create result of every client corrosponding to the trail
  URL : /api/result/createResult/:trailId
  @fields : question,selectedAnswer
  @method : POST
  @access : private
*/

router.post("/createResult/:trailId", authenticate, async (req, res) => {
  try {
    const trailId = req.params.trailId;
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "user does not exist" }] });
    }
    const userRole = await Role.findOne({ _id: user.role.toString() });
    if (userRole.name !== "user") {
      return res.status(400).json({
        errors: [
          {
            msg: "Only user can start the trail , please first register an a user",
          },
        ],
      });
    }

    let trail = await Trail.findOne({ _id: trailId });
    let selectedQuestions = await resultService.getQuestionAnswerByQuestionId(
      req.body
    );
    let requiredQuestionObj = await resultService.returnIdObject(
      selectedQuestions,
      req.body
    );

    selectedQuestions = await resultService.createUserAnswerWithCorrectAnswer(
      selectedQuestions,
      req.body
    );

    let resultObject = {
      user: req.user.id,
      trails: trail._id,
      userAnwers: requiredQuestionObj,
    };

    resultObject = await resultService.returnResultObj(resultObject);
    resultObject = await resultService.saveResult(resultObject);

    res.status(200).json({
      msg: "success",
      result: selectedQuestions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage :to delete a result
  URL : /api/result/:resultId
  @fields : question,selectedAnswer
  @method : delete
  @access : private
*/

router.delete("/:resultId", authenticate, async (req, res) => {
  try {
    let resultId = req.params.resultId;
    const user = await User.findOne({ _id: req.user.id });
    let userIdentity = await roleServices.getRoleById(user.role.toString());

    if (userIdentity.name === "client") {
      return res.status(400).json({
        errors: [{ msg: "you have no rights to delete your result" }],
      });
    }

    let result = await resultService.getResultByresultId(resultId);
    if (!result) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No result available for this id" }] });
    }
    await Result.findByIdAndRemove(resultId);
    res.status(200).json({ msg: "Result is deleted", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage :to get a result corrosponding to trail
  URL : /api/result/:trailId
  @fields : 
  @method : GET
  @access : private
*/

router.get("/:trailId", authenticate, async (req, res) => {
  try {
    let trailId = req.params.trailId;
    let trail = await Result.find().populate('user',['name','email']);

    if(!trail){
      return res
      .status(400)
      .json({ errors: [{ msg: "No Trail Available" }] });
    }
    trail =  trail.filter((item)=>{
      return item.trails.toString() === trailId
    })   

    res.status(200).json({
      msg:'success',
      result:trail
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage :to get a result corrosponding to trail and userId
  URL : /api/result/user/trailId
  @fields : 
  @method : GET
  @access : private
*/
router.get("/user/trails", authenticate, async (req, res) => {
  try {
    
    let result = await Result.find().populate('trails',['trailName']).select("-createdAt")
    .select("-updatedAt")
    .select("-__v");
    const user = await User.findOne({ _id: req.user.id });
    
    if(!user) {
      return res.status(401).json({errors : [{msg: 'user does not exist'}]})
    }
    if(!result){
      return res
      .status(400)
      .json({ errors: [{ msg: "No Trail Available" }] });
    }
    result =  result.filter((item)=>{
      return item.user.toString() === req.user.id
    })

    res.status(200).json({
      msg:'success',
      result:result
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

module.exports = router;
