const express=require('express')
const planetsRouter=require('./planets/planet.router')
const launchesRouter=require('./launches/launches.router')
const { router } = require('../app')

const api=express.Router()

api.use('/planets',planetsRouter)
api.use('/launches',launchesRouter)

module.exports=api