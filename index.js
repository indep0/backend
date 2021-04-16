"use strict";

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 5000
const MongoClient = require('mongodb').MongoClient
//const connectionString = 'mongodb://mongodb:27017'
const connectionString = 'mongodb://127.0.0.1:27017'
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

		// Solicita la lista de estados e inmuebles para llenado de dropdownlist
		app.get('/info', async (reqest, response) => {
			db.collection('estate')
				.find({}, {projection:{ _id:0, TipoInmueble:1, EntidadFederativa:1 }})
				.toArray((err, res) => {
					// Se crean sets para eliminar duplicados
					let estados = ([... new Set(res.map((data) => data.EntidadFederativa))]).sort();
					let inmuebles = ([... new Set(res.map((data) => data.TipoInmueble))]).sort();
					response.status(200).send({estados, inmuebles});
				});
		})

        app.get('/inmueble',  async (request, res) => {
            let query = {};
			let entidad, tipo = '';
			if (entidad = request.query.entidadFederativa) 
				query.EntidadFederativa = entidad.toUpperCase();
			if (tipo = request.query.TipoInmueble)
				query.TipoInmueble = tipo.toUpperCase();

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