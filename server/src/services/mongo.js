const mongoose=require('mongoose')

const MONGODB_URL='mongodb+srv://nasa-api:NIJyxOro7G4DB5Uw@nasaapi.xzfko.mongodb.net/?retryWrites=true&w=majority'

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error',(err)=>{
    console.error(err)
})

async function mongoConnect(){
    await mongoose.connect(MONGODB_URL)
}

async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports={
    mongoConnect,
    mongoDisconnect,
}