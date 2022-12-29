const express = require('express');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();
const roleService = require('../services/roleService');


/*
  Usage : create roles for all users
  URL : /api/roles
  @fields : name
  @method : POST 
*/

router.post('/',async(req,res)=>{

  try {
   let {name} = req.body;
   
   //check if role already exist
   
   let role = await roleService.getUserByName(name);
   if(role){
    return res.status(401).json({errors : [{msg: 'Role is Already Exists'}]})
   }

   //generate role object
   let roleObject  ={
   name :name
   };

   roleObject = await roleService.createRolesObject(roleObject);
   const userRole = await roleService.saveRoles(roleObject);

   res.status(200).json({
    success:true,
    role:userRole
   })

  }catch (error) {
    console.log(error);
    res.status(500).json({errors : [{msg : error.message}]});
  }

});


module.exports = router;