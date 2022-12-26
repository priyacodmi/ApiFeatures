const mongoose=require('mongoose');


const connectDB=()=>{
    return mongoose.connect(`mongodb+srv://priyaranjan:priyaranjan@cluster0.rkcneri.mongodb.net/test`)
}

module.exports=connectDB;