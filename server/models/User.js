const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:[true,'Email must be in lowercase'],
        validate:[isEmail,'Please enter a valid email']
    },
    name:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String
    }
});

const User=mongoose.model('user',userSchema);
module.exports=User;
