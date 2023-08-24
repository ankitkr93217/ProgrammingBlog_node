// require("dotenv").config();
var jwt = require('jsonwebtoken');


class Authenticate{


    async verifyToken(req,res,next){
        
        console.log(req.headers);
        const bearerToken =req.headers['authorization'];
        const token =bearerToken.split(" ")[1];        
        // console.log(token);
 
        if (token.length===0) {
            const resData={
                status:false,
                msg:'A token is required for authentication.'
                
            }
            return res.status(403).send(resData);
        }

        try {
            const decoded = jwt.verify(token,process.env.TOKEN_SECRET );
            req.user = decoded;

        } catch (err) {
            const resData={
                status:false,
                msg:'Invalid Token.'
                
            }
            return res.status(401).send(resData);
        }

        return next();

    
    }



}

module.exports= new Authenticate();