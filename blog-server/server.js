const express=require("express");
const cors = require("cors")
const app=express()
app.use(express.json())
app.use(cors())

app.get("/path",(req,res)=>{
    res.send("Hello Durga!")
})
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("Server Listening on PORT:",PORT);
})
