const mongoose =require("mongoose")

const mongodb="mongodb+srv://prawal:prawal@cluster0.h4evao3.mongodb.net/merncrudlucky?retryWrites=true&w=majority"

mongoose.connect(mongodb,{

}).then(()=>{
    console.log(" Db connection is successfully");
}).catch((error)=>{
    console.log(error.message);
    console.log("error comes in db connection");
})