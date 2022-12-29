const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const trailServices = require("../services/trailServices");
const questionServices = require("../services/questionServices");
const Role = require("../models/Roles");
const User = require("../models/User");
const Trails = require("../models/Trails");

/*
  Usage :to create trail
  URL : /api/trails/
  @fields : questionText , options
  @method : POST
  @access : private
*/

router.post("/", authenticate, async (req, res) => {
  try {
    let { trailName, questionsId } = req.body;
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "user does not exist" }] });
    }
    const userRole = await Role.findOne({ _id: user.role.toString() });
    if (userRole.name !== "client") {
      return res.status(400).json({
        errors: [{ msg: "Only client can create the Trails for users" }],
      });
    }

    //getquestion by questions id
    let allQuestions = await questionServices.getAllQuestions();
    allQuestions = await questionServices.getQuestionByIdForTrails(
      allQuestions,
      questionsId
    );
    if (!allQuestions) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please select questions" }] });
    }

    let trailObject = {
      trailName: trailName,
      questions: questionsId,
    };

    trailObject = await trailServices.returnTrailObject(trailObject);
    trailObject = await trailServices.saveTrailObject(trailObject);

    res.status(200).json({
      msg: "Trail Created",
      trail: { ...trailObject._doc, questions: allQuestions },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage :to update trail(for user only)
  URL : /api/trails/update/:trailId
  @fields : attemptedUser
  @method : PUT
  @access : private
*/

router.put("/update/:trailId", authenticate, async (req, res) => {
  try {

    let trailId = req.params.trailId;
    const user = await User.findOne({ _id: req.user.id });
    if(!user) {
      return res.status(401).json({errors : [{msg: 'user does not exist'}]})
    }
    const userRole = await Role.findOne({_id : user.role.toString()});
    
    if(userRole.name !== "user") {
      return res
          .status(400)
          .json({ errors: [{ msg: "Only users have right to attempt the trails" }] });
    }

    let trail = await Trails.findOne({_id:trailId});
    if(!trail){
      return res
      .status(400)
      .json({ errors: [{ msg: "No trail available" }] });
    }

    let updatedTrail = {
      trailName:trail.trailName,
      questions:trail.questions,
      attemptedUser:trail.attemptedUser.concat([req.user.id.toString().replace(/ObjectId\("(.*)"\)/, "$1")])
    }

    updatedTrail = await Trails.findOneAndUpdate({_id :trailId } , {
      $set : updatedTrail
     },{new :true});

     res.status(200).json({
      msg: 'You attempted this trail',
      user:updatedTrail
     })
     
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage :to get All trail
  URL : /api/trails/all
  @fields : no-field
  @method : GET
  @access : private
*/

router.get("/all", authenticate, async (req, res) => {
 
  try {
    let trails = await trailServices.getAllTrails();
    let requiredTrails = [];
    if (!trails) {
      return res.status(400).json({ errors: [{ msg: "No Trails Found" }] });
    }
    //getquestion by questions id
    let allQuestions = await questionServices.getAllQuestionOptionOnly();
    trails.map(async (item) => {
      let allQuestions1 = await questionServices.getQuestionByIdForTrails(
        allQuestions,
        item.questions
      );
      requiredTrails.push({ trailName : item._doc.trailName, questions: allQuestions1 });
      
    if(trails.length ===requiredTrails.length ){
      res.status(200).json({trails:requiredTrails})
    }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage :to update trail(for client only)
  URL : /api/trails/update/:trailId
  @fields : 
  @method : PUT
  @access : private
*/

module.exports = router;
