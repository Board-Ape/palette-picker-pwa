const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.locals.projects = [
  { id: 1, project: 'Smith' },
  { id: 2, project: 'Jane' },
  { id: 3, project: 'Willies' }
];
app.locals.palettes = [
  {
    id: '1',
    palette:' warm',
    color1: '#a3a380',
    color2: '#d6ce93',
    color3: '#efebce',
    color4: '#d8a48f',
    color5: '#bb8588',
    projectId: 1
  },
  {
    id: '2',
    palette: 'hot',
    color1: '#0d160b',
    color2: '#785589',
    color3: '#977390',
    color4: '#ac7b7d',
    color5: '#bb8a89',
    projectId: 2
  },
  {
    id: '3',
    palette: 'fire',
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

app.get('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const palette = app.locals.palettes.find(palette => palette.id === id);

  if (palette) {
    return response.status(200).json(palette);
  } else {
    return response.sendStatus(404);
  }
});

app.post('/api/v1/projects', (request, response) => {
  const { project } = request.body;
  const id = app.locals.projects.length + 1;

  if (!project) {
    return response.status(422).send({
      error: 'Please Enter Name Property'
    });
  } else if (app.locals.projects.find(project => project.project === project)) {
    return response.stats(422).send({
      error: 'Name Property Already Exist'
    });
  } else {
    app.locals.projects.push({ id, project });
    return response.status(201).json({ id, project });
  }
});

app.post('/api/v1/palettes', (request, response) => {
  const { palette } = request.body;
  const id = app.locals.palettes.length + 1;
  const newPalette = Object.assign({ id }, palette);

  if (palette) {
    app.locals.palettes.push(newPalette);
    return response.status(201).json(newPalette);
  } else {
    return response.status(422).send({
      error: 'No palette property provided.'
    });
  }
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const selectedPalette = app.locals.palettes.find(palette => palette.id === id);

  if (selectedPalette) {
    app.locals.palettes = app.locals.palettes.filter(palette => palette !== selectedPalette);
    return response.sendStatus(204);
  } else {
    return response.status(422).json({ error: `${id} does not exist` });
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
