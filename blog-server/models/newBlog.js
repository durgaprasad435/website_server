const {model,Schema}=require("mongoose")

const NewBlog=new Schema({
    id:String,
    Title:{
        type:String,
        require:true,
    },
    Description:{
        type:String,
        require:true,
    },
    Category:{
        type:String,
        require:true,
    },
    Image:{
        type:Object,
        require:true,
    },
    isNew:String,
    Author:String,
    Content:String,
    date_created:Date,
})
const NBlog=model("NBlog",NewBlog)
module.exports=NBlog;