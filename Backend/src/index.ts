import cors from "cors";
import "dotenv/config";
import express from "express";


const app=express();

app.use(express.json());
app.use(cors({origin:"*"}));

app.get("/",(req,res)=>{
    res.json({message:"Server is up and running"});
})


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server is running on port http://locahost:${port}`);
})