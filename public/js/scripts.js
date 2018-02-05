const generateRandomColor = () => {
  const chars = '0123456789ABCDEF';
  let hex = '#';
  for (let iterator = 0; iterator < 6; iterator++) {
    hex += chars[Math.floor(Math.random() * 16)];
  }
  return hex;
};

const setPalette = () => {
  for (let iterator = 1; iterator < 6; iterator++){
    const randomHex = generateRandomColor();
    if (!$(`.color${iterator}`).hasClass('locked')) {
      $(`.color${iterator}`).css('background-color', randomHex);
      $(`#color${iterator}Hex`).text(randomHex);
    }
  }
};

const toggleLock = (event) => {
  const bar = $(event.target);
  bar.closest('.color').toggleClass('locked');
};

const addProject = (name, value) => {
  $('.drop-down').append(`<option value='${value}'>${name}</option>`);
};

const makeProjectList = (projects) => {
  projects.forEach(project => {
    addProject(project.name, project.id);
  });
};

const showPalettes = (palettes) => {
  palettes.forEach(palette => {
    $(`.project${palette.project_id}`).append(`
      <div class='full-palette' id='${palette.id}'>
        <div class='saved-palette-titles'>
          <h3>${palette.name}</h3>
        </div>
        <div class='small-color'
          style='background-color: ${palette.hex1}'>
        </div>
        <div class='small-color'
          style='background-color: ${palette.hex2}'>
        </div>
        <div class='small-color'
          style='background-color: ${palette.hex3}'>
        </div>
        <div class='small-color'
          style='background-color: ${palette.hex4}'>
        </div>
        <div class='small-color'
          style='background-color: ${palette.hex5}'>
        </div>
        <button class='delete-palette'>Delete</button>
      </div>
    `);
  });
};

const getPalettes = (projects) => {
  projects.forEach(project => {
    fetch(`/api/v1/projects/${project.id}/palettes`)
      .then( response => response.json())
      .then( palettes => showPalettes(palettes));
  });
};

const showProjects = (projects) => {
  projects.forEach(project => {
    $('.projects-container').append(`
      <div id=${project.id} class='project${project.id} project' >
        <h2 class="saved-project-titles">Project Title: ${project.name}</h2>
        <button class="delete-project-button">Delete Project</button>
      </div>
    `);
  });
};

const getProjects = () => {
  $('.project').remove();
  fetch('/api/v1/projects')
    .then(response => response.json())
    .then(projects => {
      makeProjectList(projects);
      getPalettes(projects);
      showProjects(projects);
    })
    .catch(error => console.log({ error }));
};

const addPaletteNotification = (paletteName) => {
  console.log(navigator.serviceWorker.controller);
  navigator.serviceWorker.controller.postMessage({
    type: 'add-palette',
    paletteName
  });
};

const savePalette = () => {
  const palette = {
    name: $('.name-input').val(),
    hex1: $('.color1').css('background-color'),
    hex2: $('.color2').css('background-color'),
    hex3: $('.color3').css('background-color'),
    hex4: $('.color4').css('background-color'),
    hex5: $('.color5').css('background-color'),
    project_id: $('.drop-down').val()
  };

  fetch('/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify(palette),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(palettes => showPalettes(palettes))
    .catch(error => console.log(error));
  addPaletteNotification(palette.name);

  $('.name-input').val('');
};


const saveProject = () => {
  const projectName = JSON.stringify({
    name: $('.project-input').val()
  });

  fetch('/api/v1/projects', {
    method: 'POST',
    body: projectName,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(project => addProject(project[0].name, project[0].id))
    .then(getProjects())
    .catch(error => console.log(error));

  $('.project-input').val('');
};

const deletePalette = (event) => {
  const id = $(event.target).closest('.full-palette').attr('id');

  fetch(`/api/v1/palettes/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .catch(error => console.log(error));

  $(event.target).closest('.full-palette').remove();
};

const deleteProject = (event) => {
  const id = $(event.target).closest('.project').attr('id');

  fetch(`/api/v1/projects/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .catch(error => console.log(error));

  $(event.target).closest('.project').remove();
};

// Evenet Listener
$(document).ready(setPalette);
$(document).ready(getProjects);
$('.color').on('click', ".lock-button", (event => toggleLock(event)));
$('.new-button').on('click', setPalette);
$('.save-button').on('click', savePalette);
$('.save-project').on('click', saveProject);
$('.projects-container').on('click', '.delete-palette', (event) => deletePalette(event));
$('.projects-container').on('click', '.delete-project-button', (event) => deleteProject(event));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {

    // Register a new service worker.
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => navigator.serviceWorker.ready)
      .then(registration => {
        Notification.requestPermission();
        console.log('ServiceWorker registration successful');
      }).catch(error => {
        console.log(`ServiceWorker registration failed: ${error}`);
      });
  });
}
