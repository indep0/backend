# How to run the backend project
Important: you need to have docker installed on your computer as well as Node.

- At the root folder, create a folder called ```mongodb``` and inside that folder create another one called ```database``` (Do not touch the database folder)

- Position yourself on the mongodb folder and create a file called ```datos.json```, inside this folder you should have an array of JSON objects, otherwhise, the script will fail

- Final step: position yourself at the root folder of the project and run the following command ```docker-compose up```. Wait for the services to start. If everytyhing went well, you should see this message in your command line:
```Connected to the database```

# Making requests - Endpoints
This API has two endpoints and runs on the port 5000:
- The root one ```/``` which responds with ```{message: "This was created correctly"}``` by making a ```GET``` request
- ```/inmueble``` Which returns an array depending on the query that you make by making a ```GET``` request. This query consists of two queryString parameters. Both of them are mandatory so let's examine those

The first one should be called ```entidadFederativa``` in here, write the name of a mexican state, such as Sinaloa, Jalisco or Quintana Roo, don't worry about capital letters, it will all be converted to capital letters.

The second one should be called ```TipoInmueble``` in here you should write one of these four options, again, don't worry about capitalizing everything:

- MIXTO (HABITACIONAL Y COMERCIAL)
- HABITACIONAL
- COMERCIAL
- TERRENO

So your request final ```GET``` request should look like this, asuming you typed Quintana roo as ```entidadFederativa``` and ```TipoInmueble``` was set to habitacional: ```http://localhost:5000/inmueble?entidadFederativa=quintana%20roo&TipoInmueble=habitacional```