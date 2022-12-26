const express=require('express');
const Property = require('../models/property.model');
let { body, validationResult } = require('express-validator');
const router=express.Router();


// creaet or add property
router.post('/create', async(req,res)=>{
    try {
        const property= await Property.create(req.body);
        return res.status(200).send(property);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
});


// router.post("/create",
// body('title').notEmpty().withMessage("please write title of the villa!").isString().withMessage('Title should be a string format!'),
// body('rent').notEmpty().withMessage("please enter rent for the property!").isNumeric().withMessage('Rent should be an integer value!'),
// body('location').notEmpty().withMessage("location is not specified!").isString().withMessage('Location should be in string format!'),
// body('property_type').notEmpty().withMessage("Mention property type!").isAlphanumeric().withMessage('Title should in alphanumeric form!'),
// body('image').notEmpty().withMessage("Image URL is required!").isString().withMessage('URL should be string!'),
// async(req,res)=>{
//   try {
//     let errors=validationResult(req);
//     if(!errors.isEmpty()){
//       return res.status(400).json({error:errors.array()});
//     }
//     let property= await Property.create(req.body);
//     return res.status(200).json({message:"property added successfully", property:property});
//   } catch (error) {
//     return res.status(500).json({error:error.message});
//   }
// });



// get all properties
router.get("/allProperties",async(req,res)=>{
    try {
        const query = Property.find({
            property_type: req.query.property_type,
            location: req.query.location,
            rent:req.query.rent,
            rent:{$lt : 19}
          });

          
          const filter = req.query;
          console.log(filter)
          const page = parseInt(req.query.page) || 1;
          const pageSize = parseInt(req.query.limit) || 10;
          const skip = (page - 1) * pageSize;
          const total = await Property.countDocuments();
          const pages = Math.ceil(total / pageSize);
      
          if (page > pages) {
            return res.status(404).json({
              status: "fail",
              message: "No page found",
            });
          }
          console.log(pages,total)
          result = await query.skip(skip).limit(pageSize);
          console.log(result)
          const filtered = result.filter(target => {
            //console.log("target",target)
            if (filter.filter === "") {
              return target;
            }
            else if (target.property_type.toLowerCase().includes(filter.filter)){
              return target;
            }
            else if (target.location.toLowerCase().includes(filter.filter)){
              return target;
            }
          
          })


      let properties= await Property.find({}).lean().exec();
      return res.status(200).json({message:"Properties fetched successfully", properties:properties});
    } catch (error) {
      return res.status(500).json({message:error.message});
    }
  });


module.exports=router;