const express = require("express");
const router = require("express").Router();

const app = express();

const path = require("path");
// const { promisify } = require("util");

// var multer = require('multer');
// var upload = multer();

// Body parser with form data
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 
const upload = require('express-fileupload');
app.use(upload({
  limits: {
      fileSize: 1024 * 1024 // 1 MB
  },
  abortOnLimit: true
}));

// app.use(express.static('public'));
app.use(express.static(__dirname + '/app/public/'));
app.use(express.static('/img/'));


// const formData = require("express-form-data");
// const os = require("os");
// const options = {
//   uploadDir: os.tmpdir(),
//   autoClean: true
// };
// app.use(formData.parse(options));
// app.use(formData.format());
// app.use(formData.stream());
// app.use(formData.union());

// const DirHelpers  = require("./app/helpers/DirHelpers");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

 
// var flash = require("connect-flash");
// app.use(
//   require("express-session")({
//     secret: "This is secret",
//     resave: false,
//     // cookie :{maxAge : 1000},
//     saveUninitialized: false,
//   })
// );
// app.use(flash());
// app.use(function (req, res, next) {
//   res.locals.message = req.flash();
//   next();
// });


//for root directory path globally
global.URL= path.resolve(__dirname)+'/';
//global.PUBLIC_URL=path.normalize(path.resolve(__dirname)+'/app/public/');
global.PUBLIC_URL= (path.join(__dirname,'/app/public/')).replace(/\\/g, '/');
//console.log(PUBLIC_URL);
   
class IndexController{

  constructor() { 
     
    this.listenServer();  
    this.useView();
    this.useRoutes();
    // console.log(PUBLIC_URL+'post/thumbnail/');

     
  }

  // useMiddleware(){
   //

  // }


  useRoutes(){

    const apiRoutes = require("./app/routes/api");
    const webRoutes = require("./app/routes/web");
    
  // app.route('/',(req, res){
  //   res.render("register");
  // });
    app.use("/api/", apiRoutes);
    app.use("/",webRoutes);

  }

  useView(){
    app.set("views", path.join(__dirname, "app/views"));
    app.set("view engine", "ejs");
  }
 
  listenServer(){

   var PORT = process.env.PORT || 8085;
    app.listen(PORT, function(){ console.log(`Server is listening at port ${PORT}`); });
     

  }


}



new IndexController();



