const UserModel  = require("../models/UsersModel");
const PostModel  = require("../models/PostModel");
// const multer = require("multer");
const path = require("path");


  
 


class PostController{

        
     
    
    // async uploadFiles(s_or_m='s',fieldName='',fileData='',imagePath=''){

    //     // res.send(fieldName);
    //     // return fieldName

    //     const reqFile = fileData.fieldName;
    //     // res.send(reqFile);
    //     if (!reqFile) {
    //         return res.status(400).send("No files were uploaded.");
    //     }
        
    //     const extensionName = path.extname(reqFile.name); // fetch the file extension
    //     const allowedExtension = ['.png','.jpg','.jpeg'];
        
    //     if(!allowedExtension.includes(extensionName)){
    //         return res.status(422).send("Invalid Image");
    //     }

    //     const paths = imagePath + reqFile.name + '-' + Date.now();

    //     reqFile.mv(paths, (err) => {
    //       if (err) {
    //         return res.status(500).send(err);
    //       }
    //       return res.send({ status: "success", path: path });
    //     });
    //     return path;
        
    // }
    
 
    async createPost(req,res){            
        try {
           
            let imagePath= PUBLIC_URL+'post/thumbnail/';
            // let storedImage= await this.uploadFiles('s','thumbnail',req.files,imagePath);
            let thumbnail='thumbnail';
            let reqFile = req.files.thumbnail;
            const extensionName = path.extname(reqFile.name); // fetch the file extension
            const allowedExtension = ['.png','.jpg','.jpeg'];
            
            if(!allowedExtension.includes(extensionName)){
                return res.status(422).send("Invalid Image");
            }

            const paths = imagePath + Date.now()+'-'+reqFile.name;
            reqFile.mv(paths, (err) => {
              if (err) {
                return res.status(500).send(err);
              }
            });

            // Get user input
            const { title,sub_title,desc} = req.body;
            // return res.status(403).send('qqqqqqqqqqqqq');
            // Validate user input
            if (!(title && sub_title && desc)) {
                const resData={
                    status:false,
                    msg:'All input is required.',
                
                }
                res.status(400).send(resData);
            }
 
            let data = { 
                title:req.body.title,
                sub_title:req.body.sub_title, // sanitize: convert email to lowercase   .toLowerCase()
                desc:req.body.desc,
                thumbnail:paths,
                created_by:req.user.id
            };
            // res.send(req.user);
  
            let st = await PostModel.createPost(data);

            if(st.length===0){
                const resData={
                    status:false,
                    msg:'Something error happened during create post.',
                }
                return res.status(403).send(resData);
            }
 
            const resData={
                status:true,
                msg:'Post created Successfully.',
            }
            
            return res.status(403).send(resData);
            
        } catch (error){ 

            res.send('error');
            const resData={
                status:false,
                msg:error,  
            }
            return res.status(503).send(resData);
            
        }



        

      

    }

    async createCategory(req, res){
       
        try {
  
              let status = await PostModel.createCategory(req.body);
              if (status.length === 0) {
  
                  const resData={
                      status:false,
                      msg:'Category not created.',
                  }
                  
                  return res.status(403).send(resData);
                  
              }
  
              const resData={
                  status:true,
                  msg:'Category created Successfully.',
              }
              
              return res.status(201).send(resData);
  
        } catch (error) {
  
              res.send('error');
              const resData={
                  status:false,
                  msg:error,  
              }
              return res.status(503).send(resData);
  
        }
    }

    async createSubCategory(req, res){
         
          try {
    
              let status = await PostModel.createSubCategory(req.body);
              if (status.length === 0) {
      
                  const resData={
                      status:false,
                      msg:'SubCategory not created.',
                  }
                  
                  return res.status(403).send(resData);
                  
              }
      
              const resData={
                  status:true,
                  msg:'SubCategory created Successfully.',
              }
              
              return res.status(201).send(resData);
              //dsfedrr
            //   dgdrgdgedge
            // ccccccccccccccc
  
           } catch (error) {
  
              res.send('error');
              const resData={
                  status:false,
                  msg:error,  
              }
              return res.status(503).send(resData);
  
           }
    }

    async login(req, res){
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
  
   

    
  
 
  
  
}
  
module.exports=new PostController();