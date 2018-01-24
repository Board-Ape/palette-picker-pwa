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
  { id: 3, name: 'Willy' }
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
    id: 2,
    title: 'cool',
    color1: '#ee6055',
    color2: '#60d394',
    color3: '#aaf683',
    color4: '#ffd97d',
    color5: '#ff9b85',
    projectId: 1
  },
  {
    id: 3,
    title: 'cold',
    color1: '#d1bce3',
    color2: '#c49bbb',
    color3: '#a1867f',
    color4: '#585481',
    color5: '#19297c',
    projectId: 1
  },
  {
    id: 4,
    title: 'crisp',
    color1: '#e06c9f',
    color2: '#f283b6',
    color3: '#edbfb7',
    color4: '#b5bfa1',
    color5: '#6e9887',
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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
