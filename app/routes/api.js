const router = require("express").Router();
// const filesHelper = require(URL+'app/helpers/filesHelper');


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
router.route("/register").post(AuthController.register);
router.route("/login").post(AuthController.login);
// router.route("/updateProfile").post(Authenticate.verifyToken,filesHelper.upload_userProfilePic,AuthController.updateProfile);


 //category subcategory
router.route("/post/createCategory").post(Authenticate.verifyToken,PostController.createCategory);
router.route("/post/createSubCategory").post(Authenticate.verifyToken,PostController.createSubCategory);
// router.route("/post/updateCategory").post(Authenticate.verifyToken,PostController.createPost);
// router.route("/post/updateSubCategory").post(Authenticate.verifyToken,PostController.createPost);





//for post content 
router.route("/post/createPost").post(Authenticate.verifyToken,PostController.createPost);
// router.route("/post/createPost").post(Authenticate.verifyToken,(req, res) => { });





// webRouter.route("/about").post(UsersController.about);
// router.route("/getUsers").get(UsersController.getUsers);
// router.route("/formSubmit").post(UsersController.formSubmit);
// router.route("/deleteEmployee/:id").get(UsersController.deleteEmployee);





 
module.exports = router;
