const {getALLPlanets}=require('../../models/planets.model')

function httpgetAllPlanets(req,res){
    return res.status(200).json(getALLPlanets());
}

module.exports={
    httpgetAllPlanets,
}