const UserModel  = require("../models/UsersModel");
const crypto = require('crypto');//createHmac,randomBytes
var jwt = require('jsonwebtoken');
 

class AuthController{
  
 
    async register(req, res){
       

        try {
            // return res.status(403).send(req.files);


            // Get user input
            const { name,email,password} = req.body;
            // Validate user input
            if (!(email && password && name)) {
                const resData={
                    status:false,
                    msg:'All input is required.',
                
                }
                res.status(400).send(resData);
            }

            let oldUser = await UserModel.getUser(req.body);
        //    return res.status(400).send(oldUser.length);
            if (oldUser.length===0) {
                const resData={
                    status:false,
                    msg:'User Already Exist. Please Login',
                
                }
                return res.status(409).send(resData);
            }
            // return res.status(403).send('aaaaaaaaaaaaaaaaaaaa');

            const salt =await crypto.randomBytes(16).toString('base64');
            const hash =  await crypto.createHmac('sha256', salt).update(req.body.password).digest('hex');
            req.body.salt=salt;
            req.body.password=hash;
            req.body.image=req.file.path;

            let data = await UserModel.register(req.body);

            const user = {
                id:data.insertId,
                name:name,
                email:email.toLowerCase(), // sanitize: convert email to lowercase
                role:'user',
            };
        
            // Create token
            const token = jwt.sign(user , process.env.TOKEN_SECRET , {expiresIn: "2h",} );
            // user.token = token;
            // console.log(data,user);

            const resData={
                status:true,
                msg:'You are Successfully Logged in.',
                user:user,
                token:token
            }
            
            return res.status(403).send(resData);
            
        } catch (error){ 

            const resData={
                status:false,
                msg:error,  
            }
            return res.status(503).send(resData);
            
        }
    }

    async login(req, res){
        
            // console.log(req.body);
            // console.log('aaaaaaaaaaaa');

            // res.status(400).send('zzzzzzzzzzzzz');

        try{ 

            // Get user input
            const {email,password} = req.body;

            // Validate user input
            if (!(email && password)) {
                const resData={
                    status:false,
                    msg:'All input is required.',
                
                }
                res.status(400).send(resData);
            }

            let oldUser = await UserModel.getUser(req.body);
            // console.log(oldUser);

            if (oldUser.length === 0) {
                const resData={
                    status:false,
                    msg:'User not Exist..',
                
                }
                return res.status(409).send(resData);
            }else{
                oldUser=oldUser[0];
            }
    
            const incomingPasswordhash =  await crypto.createHmac('sha256',oldUser.salt).update(password).digest('hex');
            
            if(incomingPasswordhash !==oldUser.password){

                const resData={
                    status:false,
                    msg:"Credentials don't Match.", 
                }
                return res.status(409).send(resData);
                
            } 

            const user = {
                id:oldUser.id,
                name:oldUser.name,
                email:oldUser.email.toLowerCase(), // sanitize: convert email to lowercase
                role:'admin',
            };
        
            // Create token
            const token = jwt.sign(user , process.env.TOKEN_SECRET , {expiresIn: "2h",} );
            // user.token = token;
        
            // console.log(data,user);
            const resData={
                status:true,
                msg:'You are Successfully Logged in.',
                token:token
            }
            
            return res.status(403).send(resData);

        } catch (error){ 
            console.log(error);
            const resData={
                status:false,
                msg:error.code,  
            }
            return res.status(503).send(resData);
            
        }
          
    }

    async updateProfile(req, res){

        try{ 

            // Get user input
            const {name,mobile,image} = req.body;

            // Validate user input
            if (!(name && mobile && image)) {
                const resData={
                    status:false,
                    msg:'All input is required.',
                
                }
                res.status(400).send(resData);
            }

            let oldUser = await UserModel.getUser(req.body);
            // console.log(oldUser);

            if (oldUser.length === 0) {
                const resData={
                    status:false,
                    msg:'User not Exist..',
                
                }
                return res.status(409).send(resData);
            } 

            oldUser=oldUser[0];
 
            if(image){

                // if (err) {
                //     return res.status(400).send({ message: err.message })
                // }

                profileImage =  req.file.path;
        
                
                // const file = req.file;
                // res.status(200).send({
                //     filename: file.filename,
                //     mimetype: file.mimetype,
                //     originalname: file.originalname,
                //     size: file.size,
                //     fieldname: file.fieldname,
                //     path:file.path
                // })

            }else{
                profileImage = oldUser.image;//with path
            }
     
            let data = {
                name:name,
                mobile:mobile,
                image:profileImage
            };

            let st = await UserModel.updateUser(data , req.body.user);
            if(!st){

                const resData={
                    status:true,
                    msg:'Something Wrong happened.',
                     
                }
                return res.status(403).send(resData);
            }
           
            // console.log(data,user);
            const resData={
                status:true,
                msg:'Datas are updated successfully.',   
            }
            
            return res.status(403).send(resData);

        } catch (error){ 

            const resData={
                status:false,
                msg:error.code,  
            }
            return res.status(503).send(resData);
            
        }
          
    }


    // async about(req, res){
    //   res.json({msg:'working'});
    // }
  
    // async getUsers(req, res){
    //   let data = [];
    //   try {
    //     data = await UserModel.getUsers();
    //     res.render("show",{users:data});
    //     // res.json({ msg: "success", data: data });
    //   } catch (error) {
    //     res.json({ msg: error, data: [] });
    //   }
    // }
  
 
  
  
}
  
module.exports=new AuthController();