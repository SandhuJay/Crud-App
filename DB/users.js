const mongoose =require('mongoose')
var userSch=new mongoose.Schema({
    name:{
        type:String,
        required:"*this field is required"

    }
    ,
    email:String,
    mobile:Number,
    city:String,
    
  
})
userSch.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
module.exports=mongoose.model("userdetails",userSch);