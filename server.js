const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.locals.projects = [
  { id: 1, name: 'Smith' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Willies' }
];
app.locals.palettes = [
  {
    id: 1,
    title:' warm',
    color1: '#a3a380',
    color2: '#d6ce93',
    color3: '#efebce',
    color4: '#d8a48f',
    color5: '#bb8588',
    projectId: 1
  },
  {
    id: 5,
    title: 'hot',
    color1: '#0d160b',
    color2: '#785589',
    color3: '#977390',
    color4: '#ac7b7d',
    color5: '#bb8a89',
    projectId: 2
  },
  {
    id: 11,
    name: 'fire',
    color1: '#6f1d1b',
    color2: '#bb9457',
    color3: '#432818',
    color4: '#99582a',
    color5: '#ffe6a7',
    projectId: 3
  }
];

app.get('/api/v1/projects', (request, response) => {
  if (app.locals.projects) {
    return response.status(200).json(app.locals.projects);
  } else {
    return response.sendStatus(404);
  }
});

app.get('/api/v1/palettes', (request, response) => {
  if (app.locals.palettes) {
    return response.status(200).json(app.locals.palettes);
  } else {
    return response.sendStatus(404);
  }
});

app.post('/api/v1/projects', (request, response) => {
  const { name } = request.body;
  const id = app.locals.projects.length + 1;

  if (!name) {
    return response.status(422).send({
      error: 'Please Enter Name Property'
    });
  } else if (app.locals.projects.find(project => project.name === name)) {
    return response.stats(422).send({
      error: 'Name Property Already Exist'
    });
  } else {
    app.locals.projects.push({ id, name });
    return response.status(201).json({ id, name });
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
