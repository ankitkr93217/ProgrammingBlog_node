const connection =require(URL+'app/config/db');
const { promisify } = require("util");
const promise_connection = promisify(connection.query).bind(connection);
// console.log(URL('app/config/db'));
// console.log(URL(333333));

class UserModel{

  
  // constructor() { 
     
  //   console.log(2222222222222);
     
  // }

  async register(data){
    // res.send(data);
    // console.log(data);
    let query = "insert into users(name,email,mobile,password,salt,profile_pic) values(?,?,?,?,?,?)";
    return await promise_connection(query,[data.name,data.email,data.mobile,data.password,data.salt,data.profile_pic]);
  }

  async getUser(data){
    // console.log(data);
    let query = `select * from users where email='${data.email}' limit 1`;
    return await promise_connection(query);
  }

  async getUsers(){
    let query = "select * from users";
    return await promise_connection(query);
  }

  // async updateUser(data){
  //   // console.log(data)
  //     let query = "update users set name=?,email=?,mobile=?,password=?,salt=?,image=?, where id=?";
  //     return await promise_connection(query,[data.name,data.email,data.mobile,data.password,data.salt,data.image,data.user.id]);
  // }

  async updateUser(data,user){

    // return res.status(403).send(data);
     
      let query = "update users set name=?,mobile=?,profile_pic=?,where id=?";
      return await promise_connection(query,[data.name,data.mobile,data.profile_pic,user.id]);
  }




  async formSubmit(data){
   
    let query = "insert into users(name,email,mobile) values(?,?,?)";
    return await promise_connection(query,[data.first_name,data.email,data.phone]);
  }

  async updateUser(data){
  // console.log(data)
    let query = "update users set name=?,email=?,mobile=? where id=?";
    return await promise_connection(query,[data.first_name,data.email,data.phone,data.userid]);
  }
  async deleteEmployee(id){
  // console.log(data)
    let query = "delete from users  where id=?";
    return await promise_connection(query,[id]);
  }



}


module.exports=new UserModel();
