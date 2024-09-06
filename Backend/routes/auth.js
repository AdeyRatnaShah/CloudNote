const express = require('express');
const User =  require('../models/User');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
//Create a user using: POST "/auth". Doesn't require 
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'learningIsGood'
const fetchUser = require('../middleware/fetchUser')
//Route 1 : // Create a user //no login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min:5}),
    
],async (req,res)=>{


    // const user = User(req.body);
    // user.save();

    const result = validationResult(req);
  if (!result.isEmpty()) {
          return res.status(400).json({result: result.array()});
  }
  try{

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ error: 'Sorry, a user with this email already exists'});
    }
    const salt =await bcrypt.genSalt(10)
    const secPass =await bcrypt.hash(req.body.password,salt)

    //create a new user
    user = await User.create({
      name : req.body.name,
      email : req.body.email,
      password : secPass
    })
    const data = {
      user :{
        id : user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    // console.log(jwtData)
    res.json({authToken})
    //   .then(user=>{res.json(user)}).catch(error=>{
    //     console.log(error)
    //       res.json({error: 'Please enter unique value for email'})
    //   }
    // );
  }
  //catching error
  catch(error){
      console.log(error.message);
      res.status(500).send("Internal server error")
  }

})

//Route 2 : //Authenticate a user
router.post('/login',[
  body('email','Enter a valid email').isEmail(),  
  body('password','password can not be blank').exists(),  
],async (req,res)=>{

  const result = validationResult(req);
  if (!result.isEmpty()) {
          return res.status(400).json({result: result.array()});
  }

  const {email,password} = req.body;
  try{
    let user =await User.findOne({email});
    if(!user){
      return res.status(400).json({error: 'Please try to login with correct credentials'})
    }
    const passwordCompare =await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error:'Please try to login with correct credentialsads'})
    }
    const data = {
      user :{
        id : user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    // console.log(jwtData)
    res.json({authToken})
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error")
  }

})

//Route 3: Get logged in user details using "auth/getuser". Login required
router.post('/getuser',fetchUser,async (req,res)=>{
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

module.exports = router