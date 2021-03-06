const request=require('supertest');
const app=require('../../app')
const { mongoConnect,mongoDisconnect }=require('../../services/mongo')
const {loadPlanetsData}=require('../../models/planets.model')

describe('Launches Api',()=>{
    beforeAll(async ()=>{
        await mongoConnect();
        await loadPlanetsData();
    })

    afterAll(async ()=>{
        await mongoDisconnect();
    })
    describe('Test GET /launches',()=>{
        test('It should response with 200 success',async ()=>{
            const response =await request(app)
            .get('/v1/launches')
            .expect('Content-Type',/json/)
            .expect(200);
        })
    })

    describe('Test POST /launch',()=>{
        const launchData={
            mission:"Uss Enterprise",
            rocket:"agni 9",
            target:"Kepler-62 f",
            launchDate:"January 4,2028"
        }
        const launchDatawithoutDate={
            mission:"Uss Enterprise",
            rocket:"agni 9",
            target:"Kepler-62 f"
        }
        test('It should respond with 201 created',async ()=>{
            const response=await request(app)
            .post('/v1/launches')
            .send(launchData)
            .expect('Content-Type',/json/)
            .expect(201)
            const requestDate=new Date(launchData.launchDate).valueOf()
            const responseDate=new Date(response.body.launchDate).valueOf()
            expect(responseDate).toBe(requestDate)
            expect(response.body).toMatchObject(launchDatawithoutDate)
        })
        test('It should catch missing required properties',async ()=>{
            const response=await request(app)
            .post('/v1/launches')
            .send(launchDatawithoutDate)
            .expect('Content-Type',/json/)
            .expect(400)
    
            expect(response.body).toStrictEqual({
                error:'Missing required information'
            })
        })
        const launchDatawithInvalidDate={
            mission:"Uss Enterprise",
            rocket:"agni 9",
            target:"Kepler-62 f",
            launchDate:"groot"
        }
        test('It should catch invalid dates',async ()=>{
            const response=await request(app)
            .post('/v1/launches')
            .send(launchDatawithInvalidDate)
            .expect('Content-Type',/json/)
            .expect(400)

            expect(response.body).toStrictEqual({
                error:'Invalid launch Date'
            })
        })
    })
})

