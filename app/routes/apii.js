const router = require("express").Router();
const filesHelper = require(URL+'app/helpers/filesHelper');


//for controller
const  UsersController = require("../http/controllers/UsersController");
const  AuthController = require("../http/controllers/AuthController");
const  PostController = require("../http/controllers/PostController");


//for middleware
const Authenticate=require(URL+"app/http/middleware/Authenticate");

//for files
// const FileUpload=require(URL+"app/http/middleware/FileUpload");




 
//for file
// const userProfilePic=FileUpload.userProfilePic;


 
//Auth
router.route("/register").post(filesHelper.upload_userProfilePic,AuthController.register);
router.route("/login").post(AuthController.login);
// router.route("/updateProfile").post(Authenticate.verifyToken,filesHelper.upload_userProfilePic,AuthController.updateProfile);


//for post content
router.route("/post/createPost").post(Authenticate.verifyToken,filesHelper.upload_thumbnail,PostController.createPost);




// webRouter.route("/about").post(UsersController.about);
// router.route("/getUsers").get(UsersController.getUsers);
// router.route("/formSubmit").post(UsersController.formSubmit);
// router.route("/deleteEmployee/:id").get(UsersController.deleteEmployee);





 
module.exports = router;
