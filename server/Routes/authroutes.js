const {signIn,signUp,signOut}=require("../controller/auth")
const {verifyToken}=require("../middleware/authmiddleware")
module.exports=function(app){
    app.post('/user/signin',signIn)
    app.post('/user/signup',signUp)
    app.get('/user/signout',[verifyToken],signOut)
}