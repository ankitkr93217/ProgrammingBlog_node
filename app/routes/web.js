const webRouter = require("express").Router();

// ********import controller here
// const {register,about} = require("../controllers/UsersController");
const UsersController = require("../http/controllers/UsersController");






// ********write web route  here
// webRouter.route("/register").get(UsersController.register);
// webRouter.route("/about").post(UsersController.about);

// webRouter.route("/getUsers").get(UsersController.getUsers);
// webRouter.route("/formSubmit").post(UsersController.formSubmit);
// webRouter.route("/updateEmployee").post(UsersController.updateEmployee);
// webRouter.route("/deleteEmployee/:id").get(UsersController.deleteEmployee);


 





//for export route
module.exports = webRouter;
