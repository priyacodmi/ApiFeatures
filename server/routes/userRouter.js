const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authenticate = require("../middlewares/authenticate");
const bcrypt = require("bcryptjs");
const userService = require("../services/userServices");
const roleService = require("../services/roleService");
const jwt = require("jsonwebtoken");
const cookieService = require("../services/cookieManager");
const User = require("../models/User");
const Role = require("../models/Roles");

/*
  Usage : to Register a User
  URL : /api/users/register
  @fields :name , email , password
  @method : POST
  @access : public
*/

router.post("/register", async (req, res) => {
  try {
    let { email, password, role } = req.body;
    //check if the user is exist
    let user = await userService.getUserByEmail(email);
    if (user) {
      return res
        .status(401)
        .json({ errors: [{ msg: "User is Already Exists" }] });
    }

    let roleId = await roleService.getRoleId(role);
    console.log("role",roleId)

    //generate password and register
    bcrypt.hash(password.toString(), 10, async (err, hash) => {
      try {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        }

        const newUser = await userService.returnUserObj({
          ...req.body,
          password: hash,
          role: roleId[0]._id,
        });
        const createdUser = await userService.registerUser(newUser);
        
        res.status(200).json({
          success: true,
          message: "User Registered Succefffully",
          user: { ...createdUser._doc, role: role },
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
          data: {},
          success: false,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage : to Login a User
  URL : /api/users/login
  @fields : email , password
  @method : POST
  @access : public
*/

router.post("/login", async (request, response) => {
  try {
    let { email, password } = request.body;
    //check if the correct email
    let user = await userService.getUserByEmail(email);
    if (!user) {
      return response.status(401).json({ errors: [{ msg: "Invalid Email" }] });
    }
    const userRole = await Role.findOne({ _id: user.role.toString() });

    //check passowrd
    const isMatch = await userService.comaprePassword(password, user.password);
    if (!isMatch) {
      return response
        .status(401)
        .json({ errors: [{ msg: "Invalid Password" }] });
    }

    //create a token and send to user
    let payload = {
      user: {
        id: user.id,
        name: user.name,
      },
      iat: Math.floor(Date.now() / 1000) - 30,
      // exp:  Math.floor(Date.now() / 1000) + 60 * 60 *3
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    const refreshToken = jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const role =userRole.name 

    response.set("Access-Control-Allow-Origin", request.headers.origin); //req.headers.origin
    response.set("Access-Control-Allow-Credentials", "true");
    // access-control-expose-headers allows JS in the browser to see headers other than the default 7
    response.set(
      "Access-Control-Expose-Headers",
      "date, etag, access-control-allow-origin, access-control-allow-credentials"
    );

    cookieService.setCookie("token", refreshToken, {

      req: request,
      res: response,
    });
   cookieService.setCookie("userRole", role, {
      req: request,
      res: response,
    });
    response.status(200).json({
      msg: "Login is Successful",
      user: { ...user._doc, role: userRole.name },
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

/*
  Usage : to change role of user
  URL : /api/users/changeRole
  @fields : role,userEmail
  @method : POST
  @access : private
*/

router.put(
  "/changeRole",
  authenticate,
  [
    body("userId").notEmpty().withMessage("userId is required"),
    body("role").notEmpty().withMessage("role is required (user/client/admin)"),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { userId, role } = req.body;
      const user = await User.findOne({ _id: req.user.id });
      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "user does not exist" }] });
      }
      const userRole = await Role.findOne({ _id: user.role.toString() });

      if (userRole.name !== "admin") {
        return res.status(400).json({
          errors: [
            {
              msg: "Only admin have right to change the role of all the users/clients ",
            },
          ],
        });
      }

      const clientUser = await User.findOne({ _id: userId });

      if (!clientUser) {
        return res.status(401).json({
          errors: [
            { msg: "User for which you want to update role is not existing" },
          ],
        });
      }

      let roleId = await roleService.getRoleId(role);
      let newUserObject = {
        name: clientUser.name,
        role: roleId[0]._id,
        email: clientUser.email,
        password: clientUser.password,
        clientUser: clientUser.trails,
      };

      newUserObject = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: newUserObject,
        },
        { new: true }
      );

      res.status(200).json({
        msg: "User Status Updated Successfully",
        user: newUserObject,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/*
  Usage : to get all user for admin only
  URL : /api/users/all
  @fields : no-fields
  @method : GET
  @access : 
*/

router.get("/all", authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "user does not exist" }] });
    }
    const userRole = await Role.findOne({ _id: user.role.toString() });
    if (userRole.name !== "admin") {
      return res.status(400).json({
        errors: [
          {
            msg: "Only aadmin has right to get all the data of user and client",
          },
        ],
      });
    }

    //get id of admin from roles
    let roleId = await roleService.getRoleId("admin");
    let allUsers = await userService.getAllUsers();
    if (!allUsers) {
      return res.status(400).json({
        errors: [{ msg: "No users / clients fround" }],
      });
    }

    allUsers = await userService.filterUsersByRole(allUsers, roleId);
    const clients = await userService.getAllUsersByClientRole(allUsers);
    if (!clients) {
      return res.status(400).json({
        errors: [{ msg: "No clients register till now" }],
      });
    }
    const users = await userService.getAllUsersByUsersRole(allUsers);
    if (!users) {
      return res.status(400).json({
        errors: [{ msg: "No user register till now" }],
      });
    }
    res.status(200).json({
      status:true,
      clients:clients,
      users:users
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });  
  }
});

/*
  Usage : to get all user(for client)
  URL : /api/users/allUsers
  @fields : no-fields
  @method : GET
  @access : private
*/

router.get('/allUsers',authenticate,async(req,res)=>{
   try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "user does not exist" }] });
    }
    const userRole = await Role.findOne({ _id: user.role.toString() });
    if (userRole.name !== "client") {
      return res.status(400).json({
        errors: [
          {
            msg: "Only client has right to get all the data of user",
          },
        ],
      });
    }
   //get all users with all details  
   let allUsers = await userService.getAllUsers();
   const users = await userService.getAllUsersByUsersRole(allUsers);
  
    if (!users) {
      return res.status(400).json({
        errors: [{ msg: "No user register till now" }],
      });
    }
    res.status(200).json({
      status:true,
      users:users
    })
 
   }catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });  
  }
});

/*
  Usage : to logout User
  URL : /api/users/logout
  @fields : no-fields
  @method : POST
  @access : private
*/

router.post('/logout',authenticate,async(req,res)=>{
  try {
   
  res.clearCookie('userRole');
  res.clearCookie('token');

   res.status(200).json({
     status:true,
     msg : "User Logout"
   })

  }catch (error) {
   console.log(error);
   res.status(500).json({ errors: [{ msg: error.message }] });  
 }
});

/*
  Usage : to delete User (for admin only)
  URL : /api/users/delete/:Id
  @fields : no-fields
  @method : DELETE
  @access : private
*/

router.delete('/delete/:Id',authenticate,async(req,res)=>{

  try {
    let requiredUserId= req.params.Id;
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "user does not exist" }] });
    }
    const userRole = await Role.findOne({ _id: user.role.toString() });
    if (userRole.name !== "admin") {
      return res.status(400).json({
        errors: [
          {
            msg: "Only aadmin has right to delete the users/clients",
          },
        ],
      });
    }

    //check user exist or not
    let requiredUser = await userService.getUserById(requiredUserId);

    if (!requiredUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No user available for this id" }] });
    }
     
    requiredUser = await User.findByIdAndRemove(requiredUserId);


   res.status(200).json({
     status:true,
     msg : "User deleted",
     user:requiredUser
   })

  }catch (error) {
   console.log(error);
   res.status(500).json({ errors: [{ msg: error.message }] });  
 }
});




module.exports = router;
