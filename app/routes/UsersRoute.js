const router = require("express").Router();
// const {getUsers,formSubmit,updateEmployee,deleteEmployee} = require("../controllers/UsersController");
const {UsersController} = require("../controllers/UsersController");


router.route("/getUsers").get(UsersController.getUsers);
router.route("/formSubmit").post(UsersController.formSubmit);
router.route("/updateEmployee").post(UsersController.updateEmployee);
router.route("/deleteEmployee/:id").get(UsersController.deleteEmployee);

module.exports = router;
