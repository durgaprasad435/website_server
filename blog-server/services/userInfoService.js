const RegisterSchema =require("../models/register");
const NewBlogSchema =require("../models/newBlog")
const WishList = require("../models/wishlist")
const uuid = require("uuid");
const bcrypt=require("bcryptjs");
const { CLIENT_FOUND_ROWS } = require("mysql/lib/protocol/constants/client");
const { now } = require("mongoose");
const salt = bcrypt.genSaltSync(10);
async function LoginInfo(username,password){
    var doc=await RegisterSchema.findOne({UserName:username})
    console.log(doc)
    if(doc !=null){
        var passOk=bcrypt.compareSync(password, doc.Password);
        console.log(passOk)
        if(passOk){
            return {"status":"success","UserName":doc.UserName};
        }else{
            return {"status":"fail","message":"Invalid Password"}
        }
    }  
}
async function RegisterInfo(username,email,password){
    try{
        userInfo={
            id:uuid.v4(),
            UserName:username,
            EMail:email,
            Password:bcrypt.hashSync(password, salt),
            date_created: new Date()
        }
    var data = await RegisterSchema.create(userInfo)
    return {"status":"success","data":data};
    }catch(err){
        console.log(err)
    }
}
async function newBlog(id,title,description,category,content,authorName,override,imagepath){
    var doc= await NewBlogSchema.findOne({id:id})
    //console.log(doc)
    var template = null;
    if(doc==null){
        try{
            newBlogInfo={
                id:uuid.v4(),
                Title:title,
                Description:description,
                Category:category,
                Image:imagepath,
                Content:content,
                isNew:"Yes",
                Author:authorName,
                date_created:new Date()
            }
            var data =await NewBlogSchema.create(newBlogInfo)
            return await GetAllBlogs(newBlogInfo.isNew)
            //return data;
        }catch(err){
            console.log(err)
        }
    }else{
        template=doc
    }
    if(override=="true"){
        template.Title=title
        template.Description=description
        template.Category=category
        template.Image=imagepath
        template.Content=content
        await template.save();
        return await GetBlogs(authorName)
    }

}
async function AddToWishList(id,title,description,category,content,authorName,imagepath,date,addtoWishlist){
    var blog= await WishList.findOne({id:id})
    //console.log(blog)
    if(blog==null){
        try{
            wishListInfo={
                id:id,
                Title:title,
                Description:description,
                Category:category,
                Image:imagepath,
                Content:content,
                addToWishList:addtoWishlist,
                Author:authorName,
                date_created:date
            }
            await WishList.create(wishListInfo)
            return {"status":"success",message:"Blog added to your favorites!"};
        }catch(err){
            console.log(err)
        }
    }else{
        var deleteBlog=await WishList.deleteOne({id:id})
        return{"status":"success",message:"Blog deleted from your favorites!"}
    }
}
async function GetBlogs(item){
    var data =await NewBlogSchema.find({"Author":item}).sort({date_created:-1})
    //console.log(data)
    return data;
}
async function GetAllBlogs(){
    var data =await NewBlogSchema.find({"isNew":"Yes"}).sort({date_created:-1}).limit(4)
    return {"status":"success","data":data};
}
async function GetMyBlogs(item){
    var data =await NewBlogSchema.find({"Author":item.name}).sort({date_created:-1})
    //console.log(data)
    return {"status":"success","data":data};
}
async function DeleteBlog(item){
    var doc= await NewBlogSchema.findOne({id:item.id})
    await doc.deleteOne();
    return {"status":"success","data":await GetBlogs(doc.Author)};
}
async function GetCategories(category){
    var Upper_category=category[0].toUpperCase()+category.slice(1)
    var doc=await NewBlogSchema.find({$or:[{Category:category},{Category:Upper_category}]}).sort({date_created:-1}).limit(3)
    return {"status":"success","data":doc};
}
async function DeleteOneFromWishList(item){
    var doc= await WishList.findOne({id:item.id})
    await doc.deleteOne();
    return await GetWishLists()
}
async function GetWishLists(){
    var data =await WishList.find({"addToWishList":true}).sort({date_created:-1})
    //console.log(data)
    return {"status":"success","data":data};
}
module.exports={
    LoginInfo,
    RegisterInfo,
    newBlog,
    GetAllBlogs,
    GetMyBlogs,
    DeleteBlog,
    AddToWishList,
    GetWishLists,
    DeleteOneFromWishList,
    GetCategories
}