const mongoose=require('mongoose')

const candiesSchema=mongoose.Schema({
  
    Totalcandies:
    { type:Number, required:false},
    Email:
    { type:String, required:false},
    Date_time:
    { type:Date, required:false},
    day1:
    { type:Boolean, required:false},
    day2:
    { type:Boolean, required:false},
    day3:
    { type:Boolean, required:false},
    day4:
    { type:Boolean, required:false},
    day5:
    { type:Boolean, required:false},
    day6:
    { type:Boolean, required:false},
    day7:
    { type:Boolean, required:false},
   
   })
  
   module.exports=mongoose.model('candies',candiesSchema)
  