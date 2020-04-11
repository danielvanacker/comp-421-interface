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

const closePool = (request, response) => {
    pool.end();
    response.status(200).json({message: 'Connection closed.'})
}

app.route('/pilots')
  .get(getPilots)
  .post(addPilot);

app.route('/terminate')
  .get(closePool)

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})