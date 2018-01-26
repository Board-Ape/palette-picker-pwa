// require express and call it through app const
const express = require('express');
const app = express();
// environment configuration
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
// middleware
const bodyParser = require('body-parser');
// development port set to 3000,
app.set('port', process.env.PORT || 3000);
// use static pages from public directory
app.use(express.static(__dirname + '/public'));
// use bodyParser middleware to parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// GET method endpoint projects
app.get('/api/v1/projects', (request, response) => {
  // select the database projects
  database('projects').select()
  // consume async promise
    .then((projects) => {
      // resolved promise will result in status 200
      // and return projects
      response.status(200).json(projects);
    })
    // error if promise is not resolved
    .catch((error) => {
      // unresolved promise will result in status 500
      // and return error
      response.status(500).json({ error });
    });
});
// GET method endpoint palettes
app.get('/api/v1/palettes', (request, response) => {
  // select the database projects
  database('palettes').select()
  // consume async promise
    .then((palettes) => {
      // resolved promise will result in status 200
      // and return palettes
      response.status(200).json(palettes);
    })
    // error if promise is not resolved
    .catch((error) => {
      // unresolved promise will result in status 500
      // and return error
      response.status(500).json({ error });
    });
});
// POST method endpoint projects
app.post('/api/v1/projects', (request, response) => {
  // set request.body to project const
  const project = request.body;
  // set required param to name
  for (let requiredParameter of ['name']) {
    // if required param does not exist
    if (!project[requiredParameter]) {
      // send user status 422 and what they are missing
      return response.status(422).send({ error: `You're missing a ${requiredParameter}.` });
    }
  }
  // select database and insert all information
  database('projects').insert(project, '*')
    // consume async promise
    .then(project => {
      // success, respond with status 201 and return entire project
      response.status(201).json(project);
    })
    // unsuccesful
    .catch(error => {
      // respond with status 500 and error object
      response.status(500).json({ error });
    });
});
// POST method endpoint palettes
app.post('/api/v1/palettes', (request, response) => {
  // set request.body to project const
  const palette = request.body;
  // set required params to name, hex(1 to 5)
  for (let requiredParameter of ['name', 'hex1', 'hex2', 'hex3', 'hex4', 'hex5']) {
    // if missing param
    if (!palette[requiredParameter]) {
      // respond with status 422 and which param is missing to user
      return response.status(422).send({ error: `You're missing a ${requiredParameter}.` });
    }
  }
  // select database palettes and insert all information
  database('palettes').insert(palette, '*')
    // consume async promise
    .then(palette => {
      // success, response status 201 and entire palette object
      response.status(201).json(palette);
    })
    // unsuccesful
    .catch(error => {
      // response status 500 and error object
      response.status(500).json({ error });
    });
});
// GET method endpoint select individual palettes
app.get('/api/v1/projects/:id/palettes', (request, response) => {
  // select database
  database('palettes')
    // select based off the id given
    .where({ project_id: request.params.id}).select()
    // consume async promise
    .then(palette => {
      // success, response status 201 and entire palette object
      response.status(200).json(palette);
    })
    // unsuccesful
    .catch(error => {
      // response status 500 and error object
      response.status(500).json({ error });
    });
});
// DELETE method specific palette
app.delete('/api/v1/palettes/:id', (request, response) => {
  // setting request params to const id
  const id = request.params;
  // select palette based off id and delete
  database('palettes').where(id).del()
    // consume async promise
    .then(result => {
      // if nothing to delete
      if (!result) {
        // respond with 422 and error no palette
        response.status(422).json({ error: 'no palette'});
        //otherwise
      } else {
        // respond with 204 status code
        response.sendStatus(204);
      }
    })
    // if there is failure from the server side respond 500 and error
    .catch(error => response.status(500).json({ error }));
});
// app is listening from port set above (http://localhost:3000)
app.listen(app.get('port'), () => {
  // log in the console the port that it's running on
  console.log(`running on ${app.get('port')}.`);
});
// exporting for testing purposes
module.exports = app;
