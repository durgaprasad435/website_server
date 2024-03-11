const {model,Schema}=require("mongoose")

const Wishlist=new Schema({
    id:String,
    Title:String,
    Description:String,
    Category:String,
    Image:String,
    addToWishList:Boolean,
    Author:String,
    Content:String,
    isNew:String,
    date_created:String,
})
const WishList=model("WishList",Wishlist)
module.exports=WishList;