const express=require('express')
require('dotenv').config()
const morgan=require('morgan')
const bodyParser=require('body-parser')
const userRoute=require('./Routes/place_routes')
require('./config/init_mongodb')
const cors = require('cors');


const app=express()

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/india',userRoute)

const port =process.env.PORT || 3001
app.listen(port,()=>{
    console.log("Server is runing on port https://localhost:",`${port}`)
})