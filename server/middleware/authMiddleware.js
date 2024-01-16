const jwt= require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){ 
        jwt.verify(token,'secret key from my side',(err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else
            {
                next();
            }
        });
    }

   else {
        res.redirect('/login');
    }
}
module.exports = {auth};