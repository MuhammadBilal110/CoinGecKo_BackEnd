const mongoose=require('mongoose')

const PortSchema=mongoose.Schema({
  
  U_id: 
    { type:mongoose.Types.ObjectId, ref:'USERS',required:false},
    
  Pname:
  { type:String, required:true},
    
 })

 module.exports=mongoose.model('Portfolio',PortSchema)