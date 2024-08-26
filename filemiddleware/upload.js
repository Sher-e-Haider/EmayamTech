import path from 'path';
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function(rec,file,cb){
        cb(null,'uploads/')
    },
    filename: function(rec,file,cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage:storage,
    fileFilter: function(rec,file,callback){
        if(file.mimetype == "image/png" || file.mimetype== "image/jpg"|| file.mimetype=="image/jpeg"){
            callback(null,true)
        }else{
            console.log('only jpg and png file supported ');
            callback(null,false)
        }
    },
    limits:{
        fileSize : 1024*1024*5
    }
})

export default upload