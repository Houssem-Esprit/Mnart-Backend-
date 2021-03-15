const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const coursController = require('../controllers/cours.controller');


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./public/videos/cours");
    },
    filename: (req,file,cb)=>{
        let newCatFile = new Date().getTime().toString() + path.extname(file.originalname);
        cb(null,newCatFile);
    }
});


const upload = multer({storage});

/**
 * @path /cours
 */ 

 router.route('/')
    .post(upload.single('video'), coursController.create)
    .get(coursController.getAllCours);
    
 router.get("/getCoursPosts", coursController.getCoursPost);

 router.put("/updateViews",coursController.updateViews);


module.exports = router;