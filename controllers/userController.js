
const States=require('../models/state_db_schema')
const Cities=require('../models/city_db_schema')
const axios=require('axios');




const state= async(req,res)=>{
    try {
        const data=new States({
            state_name:req.body.state_name,
            capital:req.body.capital,
            Number_of_District:req.body.Number_of_District,
            tourist_places:req.body.tourist_places
        })
        const stateData=await data.save()
        res.status(200).send({success:true,message:'State details successully added.',state:stateData})
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const city= async(req,res)=>{
    try {
        const data=new Cities({
            state_name:req.body.state_name,
            city_name:req.body.city_name,
            tourist_place:req.body.tourist_place,
            designation:req.body.designation,
            place_to_visit:req.body.place_to_visit,
            description:req.body.description,
            best_time_to_visit:req.body.best_time_to_visit
        })
        const cityData=await data.save()
        res.status(200).send({success:true,message:'City details successully added.',city:cityData})
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
const india= async(req,res)=>{
    try {
        
        const state=await States.find()
        console.log(state)
        if(state){
            res.status(200).send({state})
        }else{
            res.status(404).send({success:true,message:'Data not found.'})
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }

}


const states = async(req,res)=>{
    try{
        
    const state_name=capitalizeFirstLetter(req.params.state_name)
   const page=req.query.page
   const limit=req.query.limit
    const state = await Cities.find({$or:[{state_name:state_name},{city_name:state_name},{tourist_place:state_name}]}).limit(limit).skip((page-1)*2)          
    if (state.length==0){
            res.status(404).send({success:true,message:" No place found."})
        }else{
            const weatherPromises = state.map(async (city) => {
            const cityWeather = await fetchWeatherData(city.city_name);
            return { ...city.toObject(), weather: cityWeather };
          });
    
          const cityDataWithWeather = await Promise.all(weatherPromises);
    
          res.status(200).send({ state: cityDataWithWeather });
        }

    }catch(err){
        res.status(400).send({success:false,message:err.message})
    }

}

const stateCity= async(req,res)=>{
    try {
        const state_name=capitalizeFirstLetter(req.params.state_name)
        const city_name =capitalizeFirstLetter(req.params.city_name)
        //console.log(city_name)
         const city= await Cities.find({$or:[{state_name:state_name,city_name:city_name},
                                             {city_name:state_name,tourist_place:city_name},
                                             {state_name:state_name,tourist_place:city_name}]})
       if (city.length==0){
            res.status(404).send({success:true,message:" No place found."})
        }else{
            const weatherPromises = city.map(async (city) => {
            const cityWeather = await fetchWeatherData(city.city_name);
            return { ...city.toObject(), weather: cityWeather };
          });
    
          const cityDataWithWeather = await Promise.all(weatherPromises);
    
          res.status(200).send({ state: cityDataWithWeather });
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
    
}



const stateCityTourist= async(req,res)=>{
    try {
       const state_name=capitalizeFirstLetter(req.params.state_name)
        const city_name =capitalizeFirstLetter(req.params.city_name)
        const tourist_place=capitalizeFirstLetter(req.params.tourist_place)
        //console.log(city_name)
         const place= await Cities.find({state_name:state_name,city_name:city_name,tourist_place:tourist_place})
        // console.log(city.length)
        if (place.length==0){
            res.status(404).send({success:true,message:" No place found."})
        }else{
            const weatherPromises = place.map(async (city) => {
            const cityWeather = await fetchWeatherData(city.city_name);
            return { ...city.toObject(), weather: cityWeather };
          });
    
          const cityDataWithWeather = await Promise.all(weatherPromises);
    
          res.status(200).send({ state: cityDataWithWeather });
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }

}
const search= async(req,res)=>{
    try{
    const search=req.body.search
    const placeData=await Cities.find({$or:[{"city_name":{$regex:".*"+search+".*",$options:"i"}} ,
                                        { "tourist_place":{$regex:".*"+search+".*",$options:"i"}},
                                        {"state_name":{$regex:".*"+search+".*",$options:"i"}},
                                        {"place_to_visit":{$regex:".*"+search+".*",$options:"i"}}] })
    if(placeData.length>0){
        res.status(200).send({placeData})
    }else{
        res.status(200).send({success:true,message:"No data found."})
    }
}catch(error){
    res.status(400).send({success:false,message:error.message})
}
}

async function fetchWeatherData(cityName) {
    try {
      
      const apiUrl =  `http://api.weatherstack.com/current?access_key=c7da726b53e919434c74e22d54826412&query=${cityName}`;
  
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      //console.log(weatherData)
     const temp=weatherData.current.temperature
       const weather_desc=weatherData.current.weather_descriptions
  //console.log(weatherData)
  const dataweather=[{"temperature":temp},{"description":weather_desc}]
      return dataweather;
    } catch (error) {
      console.error(`Error fetching weather data for ${cityName}: ${error.message}`);
      return null;
    }
  }


function capitalizeFirstLetter(str) {
  
    const words = str.split(' ');
    const capitalizedWords = words.map((word) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return '';
      }
    });
  
    return capitalizedWords.join(' ');
  }


module.exports={
    state,
    city,
    india,
    states,
    
    
    stateCity,
   
    stateCityTourist,
    search
}

