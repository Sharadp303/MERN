const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const cookieParser=require("cookie-parser")

const {db}=require("./config/dbconfig")
const {PORT}=require("./config/serverconfig")

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5566"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
    }))

require("./Routes/authroutes")(app)

mongoose.connect(db,{
       useNewUrlParser:true,
       useUnifiedTopology:true 
    }).then(()=>{
        console.log("Connected to Db")
    }).catch((err)=>console.log(err))

app.listen(PORT,()=>{
    console.log("server running on http://localhost:5566")
})