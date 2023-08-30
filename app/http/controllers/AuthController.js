const UserModel  = require("../models/UsersModel");
const crypto = require('crypto');//createHmac,randomBytes
var jwt = require('jsonwebtoken');
const path = require("path");
 

class AuthController{
  
 
    async register(req, res){
       

        try {
            // return res.status(403).send(req.files);
            // return res.status(403).send(req.body);


            // Get user input
            const { name,email,password} = req.body;
            const {profile_pic} = req.files;
            // Validate user input
            if (!(email && password && name)) {
                const resData={
                    status:false,
                    msg:'All input is required.',
                
                }
                res.status(400).send(resData);
            }

            let oldUser = await UserModel.getUser(req.body);

            if (oldUser.length === 0) {
                
            }else{
                const resData={
                    status:false,
                    msg:'User Already Exist. Please Login',
                
                }
                return res.status(409).send(resData);
            }
 
            const salt =await crypto.randomBytes(16).toString('base64');
            const hash =  await crypto.createHmac('sha256', salt).update(req.body.password).digest('hex');
            req.body.salt=salt;
            req.body.password=hash;
 
             // for profile pic
            let profileImage='';
           
             if(profile_pic){
               
                 let imagePath= PUBLIC_URL+'profile/';
                  // let storedImage= await this.uploadFiles('s','thumbnail',req.files,imagePath);
                 let profile_pic='profile_pic';
                 let reqFile = req.files.profile_pic;
                 
                 const extensionName = path.extname(reqFile.name); // fetch the file extension
                 const allowedExtension = ['.png','.jpg','.jpeg'];
                //  const extensionName = reqFile.name.split(".")[1]; // fetch the file extension
                //  const allowedExtension = ['png','jpg','jpeg'];
                 
                 if(!allowedExtension.includes(extensionName)){
                     return res.status(422).send("Invalid Image");
                 }
     
                 const uploadingPaths = imagePath + Date.now()+'-'+reqFile.name;
                
                 reqFile.mv(uploadingPaths, (err) => {
                   if (err) {
                      return res.status(500).send({ msg:' error h.',
                     error:err});
                   }
                 });
                 profileImage =uploadingPaths;
                 
            } 

            req.body.profile_pic=profileImage;
  
             // insert data
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
                msg:'You are Successfully Registered and Logged in.',
                user:user,
                token:token,
                 
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
            const {name,mobile} = req.body;
            const {profile_pic} = req.files;

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

            let profileImage='';
 
            if(profile_pic){

                let imagePath= PUBLIC_URL+'post/profile/';
                // let storedImage= await this.uploadFiles('s','thumbnail',req.files,imagePath);
                let profile_pic='profile_pic';
                let reqFile = req.files.profile_pic;
                const extensionName = path.extname(reqFile.name); // fetch the file extension
                const allowedExtension = ['.png','.jpg','.jpeg'];
                
                if(!allowedExtension.includes(extensionName)){
                    return res.status(422).send("Invalid Image");
                }
    
                const uploadingPaths = imagePath + Date.now()+'-'+reqFile.name;
                reqFile.mv(uploadingPaths, (err) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                });
                profileImage =uploadingPaths;
    

            }else{
                profileImage = oldUser.profile_pic;//with path
            }
     
            let data = {
                name:name,
                mobile:mobile,
                profile_pic:profileImage
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