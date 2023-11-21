const mongoose=require('mongoose')


const citySchema=mongoose.Schema({
    state_name:{
        type:String,
        required:true
    },
    city_name:{
        type:String,
        required:true
    },
    tourist_place:{
        type:String,
        required:true
    },
    designation:{
        type:String,
    
    },
    place_to_visit:{
        type:Array
    },
    description:{
        type:String,
        required:true
    },
    best_time_to_visit:{
        type:String,
        required:true
    }
   
})


module.exports=mongoose.model('city',citySchema)