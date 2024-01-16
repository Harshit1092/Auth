const User = require('../models/User');

const updateuser_post = async (req,res)=>{
    let {name,education,mobile,address} = req.body;
    const id=req.query.id;
    const ifexist = await User.findById(id);
    if (ifexist) {

        if(name){
            try {
                await User.updateOne(
                { "_id" : id },
                { $set: { "name" : name } }
                );
            } catch (e) {
                console.log(e);
                res.json({error:"something went wrong in updating name"});
            }
        }
        if(education){
            try {
                await User.updateOne(
                { "_id" : id },
                { $set: { "education" : education } }
                );
            } catch (e) {
                console.log(e);
                res.json({error:"something went wrong in updating education"});
            }
        }
        if(mobile){
            try {
                await User.updateOne(
                { "_id" : id },
                { $set: { "mobile" : mobile } }
                );
            } catch (e) {
                console.log(e);
                res.json({error:"something went wrong in updating mobile"});
            }
        }
        if(address){
            try {
                await User.updateOne(
                { "_id" : id },
                { $set: { "address" : address } }
                );
            } catch (e) {
                console.log(e);
                res.json({error:"something went wrong in updating address"});
            }
        }  
        res.json({status:"updated"}); 
    }
    else{
        res.json({error:"user not found"});
    }
    
}

module.exports={
    updateuser_post
}