const Roles = require("../models/Roles");

const createRolesObject = (roles) => {
  return new Roles(roles);
};

const saveRoles = (roles) => {
  return roles.save();
};

const getUserByName = (name) => {
  return Roles.findOne({ name: name });
};


const getRoleId = async (roleName) => {
  let roles = await Roles.find();
  let requiredRoleId = await roles.filter(role => role.name === roleName)
  if (requiredRoleId) {
    return requiredRoleId;
  } else {
    return false;
  }
};

const collectIdInArray = async (rolesArray) => {
  let arrayOfId = [];
  rolesArray.map((role) => {
    arrayOfId.push(role._id);
  });
  return arrayOfId;
};

const getRoleById = async (roleId) =>{
  let user = await Roles.findById(roleId);
  if(user){
    return user
  } else {
    return false
  }
};


const roleServices = {
  createRolesObject,
  saveRoles,
  getUserByName,
  getRoleId,
  collectIdInArray,
  getRoleById
};
module.exports = roleServices;
