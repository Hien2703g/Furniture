const express =require("express");
const router =express.Router();
const controller=require("../../controllers/admin/product-category.controllers");
const validate=require("../../validates/admin/product-category.validate");

const multer = require('multer');
const upload = multer();

const uploadClould=require("../../middlewares/admin/uploadCloud.middleware");


router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.single('thumbnail'),
    uploadClould.upload,
    validate.createPost,
    controller.createPost
);
// router.patch(
//   "/edit/:id",
//     upload.single('thumbnail'),
//     uploadClould.upload,
//     validate.createPost, 
//     controller.editPatch
// );

module.exports=router;