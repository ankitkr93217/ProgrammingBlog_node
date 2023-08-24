// const { getUsers ,formSubmit,updateEmployee,deleteEmployee} = require("app/http/models/UsersModel");
const UserModel  = require("../models/UsersModel");

 
class UsersController{
  
 

  async about(req, res){
    res.json({msg:'working'});
  }

  async getUsers(req, res){
    let data = [];
    try {
      data = await UserModel.getUsers();
      res.render("show",{users:data});
      // res.json({ msg: "success", data: data });
    } catch (error) {
      res.json({ msg: error, data: [] });
    }
  }

  async formSubmit(req, res){

      // console.log("r===",req.body);
    let data = [];
    try {
      data = await UserModel.formSubmit(req.body);
      req.flash('success', 'Employee Added Successfully');
      //  res.locals.message = req.flash();
      res.redirect("/getUsers")
      // res.json({ msg: "success", data: data });
    } catch (error) {
      res.json({ msg2: error, data: [] });
    }
  }

  async updateEmployee(req, res){

      // console.log("r===",req.body);
    let data = [];
    try {
      data = await UserModel.updateEmployee(req.body);
      req.flash('success', 'Employee Updated successfully');
      //  res.locals.message = req.flash();
      res.redirect("/getUsers")
      // res.json({ msg: "success", data: data });
    } catch (error) {
      res.json({ msg2: error, data: [] });
    }
  }

  async deleteEmployee(req, res){

      // console.log("r===",req.body);
    let data = [];
    try {
      data = await UserModel.deleteEmployee(req.params.id);
      req.flash('success', 'Employee Deleted successfully');
      //  res.locals.message = req.flash();
      res.redirect("/getUsers")
      // res.json({ msg: "success", data: data });
    } catch (error) {
      res.json({ msg2: error, data: [] });
    }
  }


}

module.exports=new UsersController();