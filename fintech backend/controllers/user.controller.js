const userModel = require('../models/user.model');
const nodemailer = require('nodemailer');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cloudinary =require('cloudinary');
const bcrypt =require("bcryptjs")
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
//stepOne function
const signUpStOne = (req, res) => {
  let email = req.body.email;
  userModel.findOne({ email: email }, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ message: 'Internal Server Error', status: false });
    } else {
      if (result) {
        res.send({ message: 'Email Already exists', status: false });
      } else {
        let form = new userModel(req.body);
        form.save((err) => {
          if (err) {
            console.log(err)
            res.status(501).send({
                message: 'Unable to Sign Up, Please try again',
                status: false,
              });
          } else {
            res.send({ message: 'Successful', status: true });
            getMail(email);
          }
        });
      }
    }
  });
};
// to send mail
const getMail = (email) => {
  userModel.findOne({ email: email }, (err, user) => {
  console.log(user)
    if (err) {
      res.send(501).send({ message: 'Internal Server Error', status: false });
    } else {
      let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      let details = {
        from: process.env.GMAIL_ACCOUNT,
        to: email,
        subject: 'Penny Wise Verification code',
        text: `Your Verification code is ${user.confirm_code}`,
      };
      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('sent');
        }
      });
    }
  });
};
const confirmCode = (req, res) => {
  userModel.findOne({ email: req.body.currentUser }, (err, user) => {
    if (err) {
      res.status(501).send({ message: 'Internal Server Error', status: false });
    } else {
      if (req.body.code != user.confirm_code) {
        res.send({ message: 'Invalid Code', status: false });
      } else {
        res.send({ message: 'Valid Code', status: true });
      }
    }
  });
};

const personalDetails = (req, res) => {
  userModel.findOneAndUpdate(
    { email: req.params.currentUser },
    {
      home_address: req.body.home_address,
      city: req.body.city,
      state: req.body.state,
      school: req.body.school,
      bvn: req.body.bvn,
      matricNo: req.body.matricNo,
      nin: req.body.nin,
    }, (err,result)=>{
        if(err){
            res
            .status(500)
            .send({ message: 'Internal server Error', status: false });
        }else{
     
            
             res.send({ message: ' Successful', status: true });
        }
    }
  );
};

const uploadImage=(req,res)=>{
    const email=req.params.currentUser
    cloudinary.v2.uploader.upload(req.body.profile_pics,(err,result)=>{
        if(err){
            console.log(err);
            res.send({ message: 'Internal server Error', status: false });
        }else{
            userModel.findOneAndUpdate({email: email},{profile_pics:result.secure_url},(err)=>{
                if (err) {
                 
                
                        res
                          .status(500)
                          .send({ message: 'Something went wrong', status: false });
                    
                
        }else {
            res.send({ message: 'Profile Updated Successfully', status: true });
            sendWelcomeMail(email)
          }
    })
        }
    })
}

// To send welcome mail
const sendWelcomeMail=(email)=>{
    userModel.findOne({email:email},(err,user)=>{
        if (err) {
            res.send(501).send({ message: 'Internal Server Error', status: false });
          } else {
            let mailTransporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.GMAIL_ACCOUNT,
                pass: process.env.GMAIL_PASSWORD,
              },
            });
            let details = {
              from: process.env.GMAIL_ACCOUNT,
              to: email,
              subject: 'MAYED APP SETUP SUCCESSFUL',
              text: `<h1>Dear ${user.first_name} ${user.first_name} 
              </h1> <p>Welcome to Mayed!</p>
              <p>I know you are excited to sign up with us and see how easily you could track your income and collect soft loan. I built Mayed to help individual especially the students to make progress in their own way.  </p>
              <p>
              <b>Best wishes </b>
              </p>
              <p>Ayodeji Oyebanji</p>
              <p>Founder, Mayed</p>`,
            };
            mailTransporter.sendMail(details, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('sent');
              }
            });
        }
    })
}

const genAccountNo=(req,res)=>{

  userModel.findOneAndUpdate({email:req.params.currentUser},{accountNo:req.body.accountNo,accountBalance:req.body.accountBalance,fundAmount:req.body.fundAmount}, (err,result)=>{
   
    if(err){
      res.status(501).send({message:"Internal server error",status:false})
    }else{
      console.log(result);
        res.send({message:"Successful", status:true})
    
      
    }


  })
  


}

const getUser=(req,res)=>{
 userModel.findOne({email:req.params.currentUser},(err,user)=>{
  if(err){
    res.status(500).send({ message: 'Internal server Error', status: false });
  }else{
    res.send({status: true, user})
  }
 })
  


}
const setPassword=(req,res)=>{
  const saltRound=12;
  bcrypt.hash(req.body.password, saltRound,(err,hashedPassword)=>{
    if(err){
      res.status(501).send({message:"Internal Server Error", status:false})
    }else{
      userModel.findOneAndUpdate({email:req.params.currentUser},{password:hashedPassword},(err,user)=>{
        if(err){
          res.status(500).send({message:"Internal Server Error", status:false})
        }else{
          res.status(200).send({message:"Saved ",status:true})
        }
      })
  

    }
  
  })
  


    
}
const login=(req,res)=>{
  let userDetails=req.body
  userModel.findOne({email:userDetails.email},(err,user)=>{
    if(err){
      res.status(500).send({message:"Internal Server error",status:false})
    }else{
      if(!user){
        res.send({message:"Email does not exist",status:false})

      }else{
        user.validatePassword(userDetails.password, (err,same)=>{
          if(err){
            res.status(500).send({message:"Internal Server Error",status:false})
          }else{
            if(!same){
              res.send({ message: 'Wrong  email or password ', status: false });

            }else{
              const email= userDetails.email
              const token= jwt.sign({email}, process.env.JWT_SECRET,{
                expiresIn:"3h",
              });
              res.send({message:"Welcome back",status:true, token})

            }
          }
        })

      }
    }
  })
  

}
const dashboard=(req,res)=>{
  const token=req.headers.authorization.split(' ')[1];
  jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
    if(err){
      res.status(500).send({message:"Timed out", err, status:false});

    }else{
      const email= result.email;
      userModel.findOne({email:email},(err, result)=>{
        res.send({ message: 'congratulations', status: true, result });
      })
    }
  })

}
const fundAccount=(req,res)=>{
  console.log(req.body)
  let totalBalance=req.body.fundDetails.accountBalance;
  console.log(req.params);
  userModel.findOneAndUpdate({email:req.params.currentUser},{accountBalance:totalBalance,fundAmount:req.body.fundDetails.fundAmount},(err,result)=>{
    if(err){
      console.log(err);
    }else{
   
      userModel.findOneAndUpdate({email:req.params.currentUser},{$push:{history:req.body.fundDetails}},(err,result)=>{
        if(err){
          res.status(500).send({message:"Internal Server Error", status:false});
        }
        res.send({message:"Fund Added Successfully", status:true})
       
      })
      
    }
  })
  
  

}

module.exports = {
  signUpStOne,
  getMail,
  confirmCode,
  personalDetails,
  uploadImage,
  genAccountNo,
  getUser,
  setPassword,
  login,
  dashboard,
  fundAccount

};
