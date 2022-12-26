const mongoose=require('mongoose');


const propertySchema=new mongoose.Schema({
    title:{type:String, required:true},
    rent:{type:Number,required:true},
    location:{type:String,required:true},
    property_type:{type:String,required:true},
    description:{type:String, required:false},
    availableDate:{type:Date, required:false},
    image:{type:String, requird:true},
},
{
    timestamps:true,
    versionKey:false
});

const Property= new mongoose.model('properties', propertySchema);

module.exports=Property;