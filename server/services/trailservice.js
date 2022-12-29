const Trail = require('../models/Trails');

const returnTrailObject = (trailObject)=>{
  return new Trail(trailObject);
};

const saveTrailObject = (trailObject) =>{
  return trailObject.save();
};

const updateTrailObject = async(updatedTrailObject , trailId) => {
 let updatedTrail = await Trail.findOneAndUpdate({_id :trailId } , {
  $set : updatedTrailObject
 },{new :true});
  if(updatedTrail){
    return updatedTrail
  }else {
    return false
  }
};

const deleteTrail = async(trailId) =>{
let deletedTrail =  await Trail.findByIdAndRemove(trailId);
if(deletedTrail) {
  return deletedTrail
}else {
  return false
}
};

const getAllTrails = async()=>{
  let trails =  await Trail.find().select("-attemptedUser");
  if(trails){
    return trails;
  }else {
    return false;
  }
};


const trailServices = {
  returnTrailObject,
  saveTrailObject,
  updateTrailObject,
  deleteTrail,
  getAllTrails
};

module.exports = trailServices;
