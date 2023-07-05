const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    username:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:new Date()
    },
    updatedAt:{
        type:Date,
        default:new Date()
    }
});

userSchema.pre("save",async function(){
    this.password= await bcrypt.hash(this.password,12);
})

module.exports=mongoose.model("User",userSchema);

