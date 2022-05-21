const http=require('http')
const app=require('./app')
const mongoose=require('mongoose')
const {loadPlanetsData}=require('./models/planets.model')

const PORT=process.env.PORT||8000

const MONGODB_URL='mongodb+srv://nasa-api:NIJyxOro7G4DB5Uw@nasaapi.xzfko.mongodb.net/?retryWrites=true&w=majority'

const server=http.createServer(app)

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error',(err)=>{
    console.error(err)
})

async function startserver(){
    await mongoose.connect(MONGODB_URL)
    await loadPlanetsData();

server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
}

startserver();


