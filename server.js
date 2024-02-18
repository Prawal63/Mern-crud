const express =require("express");
const app=express();


const mongoose =require("mongoose");
require("./db/conn");
const users =require("./models/userSchema");

 const router= require("./routes/router")
const cors =require("cors");

app.use(cors());

app.use(express.json());

const PORT = 8000;

app.listen(PORT,()=>{
    console.log("`server started at ${PORT}`");
})
app.use(router);

