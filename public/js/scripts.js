const randomColorGeneration = () => {
  let letters = '0123456789ABCDEF';
  let hexColor = '#';
  for (let iterator = 0; iterator < 6; iterator++) {
    hexColor += letters[Math.floor(Math.random() * 16)];
  }
  return hexColor;
};

const randomizeColors = number => {
  const colorsNumber = [1, 2, 3, 4, 5];

  colorsNumber.forEach(number => {
    $(`.color${number}`).hasClass('color') ?
      $(`#color${number}`).css("background-color", randomColorGeneration()) :
      $(`#color${number}`).css("background-color");
  });
};

const toggleLock = event => {
  const { id } = event.target;

  id.includes('color') ?
    $(`#${id}`).attr('id', `lock${id.substr(id.length - 1)}`) :
    $(`#${id}`).attr('id', `color${id.substr(id.length - 1)}`);
};

const createProject = project => {
  $('select').append(`<option value=${project}>${project}</option>`);
};

const displayProjectTitle = (id, project) => {
  $('.projects').append(`<div class="title" id="project${id}"><h3>${project}</h3></div>`);
};

const saveProject = () => {
  const project = $('#save-title').val();

  createProject(project);
};

const getPalettes = projects => {
  return fetch('/api/v1/palettes')
    .then(response => response.json())
    .then(responseObj => displayProjects(responseObj, projects));
};

const displayProjects = projects => {
  projects.forEach(project => {
    saveProject(project.id, project.title);
    createProject(project.title);
  });
  getPalettes(projects);
};

const displayPalettes = (palettes, projects) => {
  projects.forEach(project => {
    const projectPalettes = palettes.filter(palette => palette.projectId === project.id);
    projectPalettes.forEach(palette => {
      const colors = [palettes.color1, palettes.color2, palettes.color3, palettes.color4, palettes.color5];
      const colorSchemes = colors.map(color => {
        return `<div style='back-ground-color:${color}' class='palette-color'></div>`;
      });
      $(`#project${project.id}`).append(`<div class='palette'><h5>${palette.name}</h5>${colorSchemes.join('')}</div>`);
    });
  });
};


$(window).load(() => {
  randomizeColors();
  getPalettes();
});
$(".random-palette-button").click(randomizeColors);
$(".color").click(event => toggleLock(event));
$(".save-palette-button").click(saveProject);
