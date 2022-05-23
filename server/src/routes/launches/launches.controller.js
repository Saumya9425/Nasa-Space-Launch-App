const {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchbyId}=require('../../models/launches.model')

const {getPagination}=require('../../services/query')

async function httpgetAllLaunches(req,res){ 
    const {skip,limit}= getPagination(req.query)
    const launches=await getAllLaunches(skip,limit)
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req,res){
    const launch=req.body
    if(!launch.mission||!launch.rocket||!launch.target||!launch.launchDate){
        return res.status(400).json({
            error:'Missing required information'
        })
    }
    launch.launchDate= new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:'Invalid launch Date'
        })
    }
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}



async function httpAbortLaunch(req,res){
    const launchId=Number(req.params.id);
    const existsLaunch=await existsLaunchWithId(launchId)
    if(!existsLaunch){
        return res.status(404).json({
        error:'Launch not found'
        })
    }
        const aborted=await abortLaunchbyId(launchId)
        if(!aborted)
        {
            return res.status(400).json({
                error:'Launch not aborted'
            })
        }
        return res.status(200).json({
            ok:true,
        })
}

module.exports={
    httpgetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}