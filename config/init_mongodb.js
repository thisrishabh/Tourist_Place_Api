const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('mongodb connected')
})
.catch((err) =>console.log(err.message))

mongoose.connection.on('connected',()=>{
    console.log('mongoose connected to db')

})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongodb disconnected')
})
process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})