    const multer = require("multer");

    // console.log('innnnnnnnnnnnnnnnn');
    // const storage_userProfilePic = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'public/profile/')
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, file.originalname + '-' + Date.now())
    //     }
    // })

    // const upload_userProfilePic = multer({
    //     storage: storage_userProfilePic,
    //     limits: {
    //         fileSize: 1024 * 1024 * 5
    //     },
    //     fileFilter: (req, file, cb) => {
    //         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //             cb(null, true);
    //         } else {
    //             return cb(new Error('Invalid mime type'));
    //         }
    //     }
    // });

    // const uploaduserProfilePic = upload_userProfilePic.single('image');
   
  
    // const storage_postThumbPic = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'public/post/thumbnail/')
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, file.originalname + '-' + Date.now())
    //     }
    // })

    // const upload_postThumbPic = multer({
    //     storage: storage_postThumbPic,
    //     limits: {
    //         fileSize: 1024 * 1024 * 5
    //     },
    //     fileFilter: (req, file, cb) => {
    //         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //             cb(null, true);
    //         } else {
    //             return cb(new Error('Invalid mime type'));
    //         }
    //     }
    // });

    // const uploadpostThumbPic = upload_postThumbPic.single('thumbnail');


    function uploadFiles(s_or_m='s',name='',path='',fileTypeArr=[]){
        
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path)
                // path='public/post/thumbnail/'
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname + '-' + Date.now())
            }
        })

        const upload = multer({
            storage: storage,
            limits: {
                fileSize: 1024 * 1024 * 5
            },
            fileFilter: (req, file, cb) => {
                // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                if (file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
                    cb(null, true);
                } else {
                    return cb(new Error('Invalid mime type'));
                }
            }
        });

        // if(req.files.field =='thumbnail' && req.files.field.length == 1){
        //     const uploadPic = upload.single(req.files.field);
        // }else{
        //     const uploadPic = upload.array(req.files.field,4);
        // }
        let uploadPic;
        if(s_or_m=='s'){
              uploadPic = upload.any('thumbnail');
        }else if(s_or_m=='m'){
              uploadPic = upload.any('thumbnail');
        }
       
        return uploadPic;

        

    }
         

    var upload_thumbnail = uploadFiles('s','thumbnail',PUBLIC_URL+'post/thumbnail/',fileTypeArr=['a','b']);
    var upload_userProfilePic = uploadFiles('s','thumbnail',PUBLIC_URL+'profile/',fileTypeArr=['a','b']);





 
    // uploadpostThumbPic
module.exports= {upload_userProfilePic,upload_thumbnail};