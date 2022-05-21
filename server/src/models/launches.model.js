const launchesDatabase=require('./launches.mongo')

const launches=new Map(); 

let latestflightnumber=100

const launch ={
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:'Exporer IS1',
    launchDate: new Date('December 27,2030'),
    target:'Kepler-442 b',
    customers: ['SpaceX','NASA'],
    upcoming:true,
    success:true
}

launches.set(launch.flightNumber,launch) 

saveLaunch(launch)

async function getAllLaunches(){
    return await launchesDatabase.find({},{
        '_id':0,
        '__v':0
    })
}

async function saveLaunch(launch){
    await launchesDatabase.updateOne({
        flightNumber:launch.flightNumber,
    },launch,{
        upsert:true
    })
}


function addNewLaunch(launch){
    latestflightnumber++;
    launches.set(
        latestflightnumber,
        Object.assign(launch,{
            success:true,
            upcoming:true,
            customers:['Saumy','NASA'],
            flightNumber:latestflightnumber
    })
    )
}

function existsLaunchWithId(launchId){
    return launches.has(launchId)
}

function abortLaunchbyId(launchId){
    const aborted=launches.get(launchId)
    aborted.upcoming=false
    aborted.success=false
    return aborted
}

module.exports={
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchbyId
}