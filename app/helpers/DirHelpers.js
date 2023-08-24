const path = require("path");


class DirHelpers{


    // constructor() { 
     
    //     this.listenServer();  
    //     this.useView();
    //     this.useRoutes();
         
    // }

    URL(partialPath=''){
        return path.resolve(__dirname)+partialPath;
    }
}

module.exports= new DirHelpers();