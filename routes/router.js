const express=require("express");
const router =express.Router();

const users =require("../models/userSchema");

////create userr
// router.post("/register", async(req,res)=>{


//    const {name,email,age,work,mobile,add,desc} =req.body;

//    if(!name || !email || !age || !work || !mobile || !add || !desc ){
//     res.status(422).json("fill all the details");
//    }
//    try {
//     const preuser =await users.findOne({email:email});
//     console.log(preuser);
    
//     if(preuser){
//         res.status(422).json("this user is already existing ");
//     }
//     else{
//         const adduser =new users({
//             name,email,age,mobile,work,add,desc
//         });

//         await adduser.save();
//         res.status(202).json(adduser);
//         console.log(adduser);
//     }

    
//    } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//    }

// })

router.post("/register", async (req, res) => {
    const { name, email, age, work, mobile, add, desc } = req.body;
  
    try {
      console.log("Before validation");
      if (!name || !email || !age || !work || !mobile || !add || !desc) {
        console.log("Validation failed");
        return res.status(422).json("Fill all the details");
      }
  
      console.log("Before checking existing user");
      const preuser = await users.findOne({ email: email });
  
      if (preuser) {
        console.log("User already exists");
        return res.status(422).json("This user is already existing");
      }
  
      console.log("Before saving user");
      const adduser = new users({
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
      });
  
      await adduser.save();
      console.log("User saved successfully");
      res.status(202).json(adduser);
    } catch (error) {
      console.error(error);
  
      // Handle unexpected errors with a 500 status
      res.status(500).send("Internal Server Error");
    }
  });
  
///get userdata


router.get("/getdata",async(req,res)=>{
    try{
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);

    }catch (error){
        res.status(422).json(error);
    }
})


//get individual user
router.get("/getuser/:id",async(req,res)=>{
    try {
        const{id}=req.params; 
        const userindividual =await users.findById({_id:id})
        res.status(201).json(userindividual) 
     } catch (error) {
        res.status(422).json(error);
        
    }
})
// update user data
router.patch("/updateuser/:id",async(req,res)=>{
    try{
        const {id} =req.params;
        const updateduser =await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updateduser);
        res.status(201).json(updateduser);

    }catch(error){
        res.status(422).json(error);
    }
})

///DELETE
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports =router;