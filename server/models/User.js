const mongoose=require('mongoose');
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:[true,'Email must be in lowercase'],
        validate:[isEmail,'Please enter a valid email']
    },
    name:{
        type:String
    },
    education:{
        type:String
    },
    mobile:{
        type:Number
    }
});

const User=mongoose.model('user',userSchema);
module.exports=User;
