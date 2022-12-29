const User = require("../models/User");
const roleService = require("../services/roleService");
const bcrypt = require("bcryptjs");

const registerUser = (user) => {
  return user.save();
};
const returnUserObj = (user) => {
  return new User(user);
};

const getUserByEmail = (email) => {
  return User.findOne({ email: email });
};

const comaprePassword = async (password, enteredPassword) => {
  const valid = await bcrypt.compare(password, enteredPassword);
  if (valid) {
    return true;
  }
  return false;
};

const getUserById = async (id) => {
  let user = await User.findById(id).select("-password");
  if (user) {
    return user;
  } else {
    return false;
  }
};

const getAllUsers = async () => {
  let users = await User.find().select('-password');
  if (users) {
    return users;
  } else {
    return false;
  }
};

const filterUsersByRole = async (allUsers, roleId) => {
  const requiredRoleId = [`${roleId[0]?._id.toString()}`];
  const allrequiredUsers = allUsers.filter(function (item) {
    return requiredRoleId.indexOf(item.role.toString()) === -1;
  });
  if (allrequiredUsers) {
    return allrequiredUsers;
  } else {
    return false;
  }
};

const getAllUsersByClientRole =async(allrequiredUsers)=>{
  let clientRoleId =await roleService.getRoleId("client");
  clientRoleId = [`${clientRoleId[0]?._id.toString()}`];
  const client = allrequiredUsers.filter(function (item) {
    return clientRoleId.indexOf(item.role.toString()) !== -1;
  });
  if(client) {
    return client
  }else {
    return false
  }
};

const getAllUsersByUsersRole = async(allrequiredUsers)=>{
  let userRoleId = await roleService.getRoleId("user") ;
  userRoleId = [`${userRoleId[0]?._id.toString()}`];
  const users = allrequiredUsers.filter(function (item) {
    return userRoleId.indexOf(item.role.toString()) !== -1;
  });
  if(users) {
    return users
  }else {
    return false
  }
};

const userService = {
  registerUser,
  getUserByEmail,
  returnUserObj,
  comaprePassword,
  getUserById,
  getAllUsers,
  filterUsersByRole,
  getAllUsersByClientRole,
  getAllUsersByUsersRole
};
module.exports = userService;
