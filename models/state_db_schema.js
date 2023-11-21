const mongoose=require('mongoose')


const stateSchema= new mongoose.Schema({
    state_name:{
        type:String,
        required:true
    },
    capital:{
        type:String,
        required:true
    },
    number_of_district:{
        type:Number,
        required:true
    },
    tourist_places:{
        type:Array,
        required:true
    }
    
    
})

module.exports=mongoose.model('state',stateSchema)