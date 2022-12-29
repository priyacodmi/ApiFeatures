const mongooe=require('mongoose');

const connectDB=()=>{
    return mongooe.connect('url');
}

module.exports=connectDB;