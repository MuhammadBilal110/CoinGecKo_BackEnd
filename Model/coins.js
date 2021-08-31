const mongoose=require('mongoose')


const coinsSchema=mongoose.Schema({
  
   P_id: 
    { type:mongoose.Types.ObjectId, ref:'Portfolio',required:false},
    coinname:
    { type:String, required:true},
    PPC:
    { type:Number },
    qunatity:
    { type:Number },
    date :
    { type:Date },
    BS:
    { type:Boolean},
   
   })
  
   module.exports=mongoose.model('coins',coinsSchema)
  