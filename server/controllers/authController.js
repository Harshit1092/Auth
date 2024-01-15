const User=require('../models/User');
const jwt=require('jsonwebtoken');
const UserOTPverification=require('../models/UserOTPverification');
const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
const maxAge=3*24*60*60; //jwt token expires in 3 days
const createToken =(id)=>{
    return jwt.sign({id},'secret key from my side',{expiresIn :  maxAge})
}

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth:{
        user:'dep24p02@gmail.com',
        pass:'xavymfiylqyrcpvw'
    }
});


const sendverificationotp=async (result,res)=>{
    const otp=Math.floor(100000 + Math.random() * 900000);

    let mailOptions = {
        from: 'dep24p02@gmail.com',
        to: result.email, 
        subject: 'OTP for verification',
        html: `<p>OTP for verification in our app is <b>${otp}</b> .</p>
        <p> This OTP will expire in 2 minutes.</p>`
    };
    const salt=await bcrypt.genSalt();
    const hashotp=await bcrypt.hash(otp.toString(),salt);
     
    const ifexist=await UserOTPverification.findOne({email:result.email});
    if(ifexist){
        ifexist.otp=hashotp;
        ifexist.createdAt=Date.now();
        ifexist.expiresAt=Date.now()+2*60*1000;
    }
    else{
        const newotp=await new UserOTPverification({
            email:result.email,
            otp:hashotp,
            createdAt:Date.now(),
            expiresAt:Date.now()+2*60*1000 //otp expires in 2 minutes
        });
        await newotp.save();
    }
    await transporter.sendMail(mailOptions)
    .then((result)=>{
        console.log(result);
        res.status(200).json({message:"otp sent successfully"});
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({error:"something went wrong"});
    })
    

}

const signup_get = (req, res) => {
    res.send('signup');
}
const login_get = (req, res) => {
    res.send('login');
}
const signup_post = async (req, res) => {
    const {email,name,education,mobile,otp}=req.body;
    if(!email || !otp){
        res.status(400).json('please enter email and otp');
    }
    else{
        const UserOTPverify=await UserOTPverification.findOne({email:email});
        if(UserOTPverify){
            const {_id,expiresAt}=UserOTPverify;
            const hasedOTP=UserOTPverify.otp;
            if(expiresAt<=Date.now()){ 
                await UserOTPverify.deleteOne({_id});
                return res.status(400).json({error:"otp expired"});
            }
            else{
                const isvalid=await bcrypt.compare(otp.toString(),hasedOTP);
                if(isvalid){
                    const newuser=new User(
                        {
                            email,
                            name,
                            education,
                            mobile
                        }
                    );
                    newuser.save()
                    .then((result)=>{
                        try{
                            const token=createToken(result._id);
                            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
                            return res.status(201).json({user:result.email});
                        }
                        catch(err){
                            res.status(400).json({error:err});
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        return res.status(400).json({error:"something went wrong"});
                    })
                    await UserOTPverify.deleteOne({_id});
                }
                else{
                    return res.status(400).json({error:"invalid otp"});
                }

            }

        }
        else{
            return res.status(400).json({error:"email not found. please send otp again"});
        }
    }
}
const login_post = async(req, res) => {
    const {email,otp}=req.body;
    if(!email || !otp){
        res.status(400).json('please enter email and otp');
    }
    else{
        const UserOTPverify=await UserOTPverification.findOne({email:email});
        if(UserOTPverify){
            const {_id,expiresAt}=UserOTPverify;
            const hasedOTP=UserOTPverify.otp;
            if(expiresAt<=Date.now()){ 
                await UserOTPverify.deleteOne({_id});
                return res.status(400).json({error:"otp expired"});
            }
            else{
                const isvalid=await bcrypt.compare(otp.toString(),hasedOTP);
                if(isvalid){
                    User.findOne({email:email})
                    .then((result)=>{
                        try{
                            const token=createToken(result._id);
                            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
                            return res.status(201).json({user:result.email});
                        }
                        catch(err){
                            res.status(400).json({error:"some error occured"});
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        return res.status(400).json({error:"something went wrong"});
                    })
                    await UserOTPverify.deleteOne({_id});
                

                }
                else{
                    return res.status(400).json({error:"invalid otp"});
                }

            }

        }
        else{
            return res.status(400).json({error:"email not found. please send otp again"});
        }
    }
}
const sendsignupotp_post = (req, res) => {
    // res.send('new login');
    let {email}=req.body;
    if(!email){
        return res.status(400).json({error:"please add email"});
    }
    else{
        UserOTPverification.findOne({email:email})
        .then((result)=>{
            if(result){
                return res.status(400).json({error:"email already exist"});
            }
            else{
                sendverificationotp({email},res);
            }
        })
    }
}
const sendloginotp_post = (req, res) => {
    // res.send('new login');
    let {email}=req.body;
    if(!email){
        return res.status(400).json({error:"please add email"});
    }
    else{
        UserOTPverification.findOne({email:email})
        .then((result)=>{
            if(result){
                sendverificationotp({email},res);
            }
            else{
                return res.status(400).json({error:"User account does not exist. Please signup first."});
            }
        })
    }
}
const verifyotp_post = (req, res) => {
    res.send('new login');
}


module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    sendloginotp_post,
    sendsignupotp_post,
    verifyotp_post
};