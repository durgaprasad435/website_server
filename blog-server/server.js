const express=require("express");
const cors = require("cors")
const mongoose =require("mongoose")
const userInfo =require("./modules/userInfo")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/uploads",express.static(__dirname+"/uploads"))
mongoose.connect("mongodb://127.0.0.1:27017/Blogs").then(()=>{
	console.log("DB Connected")
})

app.use("/",userInfo)
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("Server Listening on PORT:",PORT);
})
