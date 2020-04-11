const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const PORT = process.env.PORT || 3002

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getPilots = (request, response) => {
  pool.query('SELECT * FROM pilot', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addPilot = (request, response) => {
  const { eid, full_name, salary, start_date } = request.body

  pool.query('INSERT INTO pilot (eid, full_name, salary, start_date) VALUES ($1, $2, $3, $4)', [eid, full_name, salary, start_date], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Pilot added.' })
  })
}

const getCapableShips = (request, response) => {
  const {e_name} = request.query;

  pool.query('WITH s2 AS (SELECT * FROM spaceship WHERE spaceship.serial_num NOT IN (SELECT serial_num FROM providestransport)),' +
  `s1 AS (SELECT distance, s_name FROM spaceobject WHERE spaceobject.s_name IN (SELECT s_name FROM explores WHERE e_name=\'${e_name}\'))` +
  'SELECT serial_num, model, s_name FROM s2 JOIN s1 ON s2.max_range >= s1.distance', [], (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAvailScientists = (request, response) => {
  const {e_name} = request.query;

  pool.query('WITH s1 AS (SELECT eid FROM scientist WHERE eid NOT IN (SELECT eid FROM partakesin)),' +
  `s2 AS (SELECT start_date, end_date FROM expedition WHERE e_name = \'${e_name}\'),` +
  's3 AS (SELECT e_name FROM expedition JOIN s2 ON expedition.start_date > s2.end_date OR expedition.end_date < s2.start_date),' +
  's4 AS (SELECT eid FROM partakesin JOIN s3 ON partakesin.e_name = s3.e_name),' +
  's5 AS (SELECT * FROM s1 UNION SELECT * FROM s4)' +
  'SELECT s5.eid, full_name FROM scientist JOIN s5 ON scientist.eid = s5.eid;', [], (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAvailLeadScientists = (request, response) => {
  const {e_name} = request.query;

  pool.query('WITH s1 AS (SELECT eid, full_name FROM leadscientist WHERE eid NOT IN (SELECT lead_eid FROM expedition)),' +
  `s2 AS (SELECT start_date, end_date FROM expedition WHERE e_name=\'${e_name}\'),` +
  's3 AS (SELECT lead_eid FROM expedition JOIN s2 ON expedition.start_date > s2.end_date OR expedition.end_date < s2.start_date),' +
  's4 AS (SELECT eid, full_name FROM leadscientist ls JOIN s3 ON ls.eid = s3.lead_eid)' +
  'SELECT * FROM s4 UNION SELECT * FROM s1;', [], (error, results) => {
    if(error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const closePool = (request, response) => {
    pool.end();
    response.status(200).json({message: 'Connection closed.'})
}

app.route('/getAvailScientists')
  .get(getAvailScientists)

  app.route('/getAvailLeadScientists')
  .get(getAvailLeadScientists)


app.route('/getCapableShips')
  .get(getCapableShips)

app.route('/pilots')
  .get(getPilots)
  .post(addPilot);

app.route('/terminate')
  .get(closePool)

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})