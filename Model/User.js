const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
  
  Username:
  { type:String, required:true},
 
  Display_Name:
  { type:String, required:true},

  Email:
  { type:String, required:true},

  Password :
  { type:String, required:true},
  Candies :
  { type:Number},
 
 })

 module.exports=mongoose.model('USERS',UserSchema)

