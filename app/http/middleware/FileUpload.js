const multer = require("multer");



class FileUpload{



    async userProfilePic(req,res,next){

        
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/profile/')
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
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                    cb(null, true);
                } else {
                    return cb(new Error('Invalid mime type'));
                }
            }
        });

        const userProfilePicc = upload.single('image');
        next();
        // return userProfilePicc;
        // return res.status(409).send('ggggggggggggg');
            
    }

    async postThumbPic(req,res){

        
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/post/thumbnail')
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
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                    cb(null, true);
                } else {
                    return cb(new Error('Invalid mime type'));
                }
            }
        });

        const uploadSingleImage = upload.single('thumbnail');
        return uploadSingleImage;
            
    }




}

module.exports= new FileUpload();