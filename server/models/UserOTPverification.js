const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const  UserOTPverificationSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
});

const UserOTPverifiaction=mongoose.model('UserOTPverification',UserOTPverificationSchema);
module.exports=UserOTPverifiaction;
