"use strict";

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 5000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb://mongodb:27017'
const queryString = require('querystring')


const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(function (request, response, next){
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'POST')
    response.setHeader('Content-Type', 'application/json')
    next()
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

MongoClient.connect(connectionString, {useUnifiedTopology: true})
    .then( async client => {
        console.log('Connected to Database')
        const db = client.db('indep')

        app.get('/', (request, response)=> {
            try{
                response.status(200).send({
                    message: "This was created correctly"
                })
            }
            catch(error){
                console.log(`Error: ${error}`)
            }
        })

        app.get('/inmueble',  async (request, res) => {
            let entidadFed = request.query.entidadFederativa.toUpperCase()
            let tipoInmueble = request.query.TipoInmueble.toUpperCase()
            let query = {EntidadFederativa: entidadFed, TipoInmueble: tipoInmueble}

            db.collection('estate').find(query).toArray(function (error, result){
                if (error) { 
                    console.error(`Error ${error}`)
                }
                res.status(200).send({
                    response: result
                })
            })
    })
})
// Endpoints