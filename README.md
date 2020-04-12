# A basic interface for a postgresql database.

## Server
To install dependencies

```bash
npm i cors dotenv express pg
npm i -D nodemon
```

To run
```bash
npm start
```

Note: always call /terminate before closing the application to close the serverpool

### Endpoints
```bash /getCapableShip:``` Display the serial number, model, and space object of spaceships that are capable of flying to the space object that is associated with a certain expedition and that are not associated with another expedition.   
  
```bash /getAvailScientists, /getAvailLeadScientists```: Generate a list of all eids and names of scientists and lead scientists that can go on a certain expedition (don’t have overlapping dates with another expedition)   
  
```bash /getAvailPilots:``` Find all pilots that are free to fly any of the spaceships  
  
```bash /addExpedition:``` Insert a new expedition.  
  
```bash/promoteScientist:``` Promote a scientist to lead scientist.

## Frontend
TBD

## Contributors
Base template code provided by taniarascia (https://www.taniarascia.com/node-express-postgresql-heroku/)  
Daniel Van Acker  
Bogdan Tanasie  