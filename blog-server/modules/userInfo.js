const express=require("express")
const router=express.Router()
const service=require("../services/userInfoService")
const path =require("path")
const fs=require("fs")
const multer = require('multer');
const { clearScreenDown } = require("readline")
const upload = multer({ dest: 'uploads/' })
router.post("/register",async(req,res,next)=>{
    var result=await service.RegisterInfo(req.body.UserName,req.body.EMail,req.body.Password)
    res.send(result)
    
})
router.post("/login",async(req,res,next)=>{
    var result=await service.LoginInfo(req.body.UserName,req.body.Password)
    res.send(result)
    
})
router.post("/newblog",upload.single('File'),async(req,res,next)=>{
    const {originalname,path} =req.file;
    const parts=originalname.split(".")
    const ext=parts[parts.length-1]
    const newPath=path+"."+ext;
    fs.renameSync(path,newPath);
    
    var result=await service.newBlog(req.body.id,req.body.Title,req.body.Description,req.body.Category,req.body.Content,req.body.AuthorName,req.body.override,newPath)
    console.log(result)
    res.send({ "status": "success", data: result });
})
router.get("/allblogs",async(req,res)=>{
    var blogs=await service.GetAllBlogs()
    res.send(blogs)
})
router.post("/myblogs",async(req,res)=>{
    var blogs=await service.GetMyBlogs(req.body)
    res.send(blogs)
})
router.post("/deleteblog",async(req,res)=>{
    var blogs=await service.DeleteBlog(req.body)
    res.send(blogs)
})
router.post("/addwishlist",async(req,res)=>{
    var blogs=await service.AddToWishList(req.body.id,req.body.Title,req.body.Description,req.body.Category,req.body.Content,req.body.Author,req.body.ImageUrl,req.body.date_created,req.body.AddtoWishlist)
    console.log(blogs)
    res.send(blogs)
})
router.get("/mywishlist",async(req,res)=>{
    var blogs=await service.GetWishLists()
    res.send(blogs)
})
router.post("/deletewishlist",async(req,res)=>{
    var blogs=await service.DeleteOneFromWishList(req.body)
    res.send(blogs)
})
router.post("/blogs",async(req,res)=>{
    var blogs=await service.GetCategories(req.body.Category)
    res.send(blogs)
    //console.log(req.body)
})
module.exports = router; 