exports.seed = function(knex, Promise) {

  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          id: 1,
          name: 'Initial Project'
        }, 'id')
          .then(project => {
            return knex('palettes').insert([
              {
                id: 1,
                name: 'Dark',
                hex1: '#1E3FDA',
                hex2: '#373F5E',
                hex3: '#2F1988',
                hex4: '#7C096B',
                hex5: '#2E2817',
                project_id: project[0]
              }
            ]);
          })
          .then(() => console.log('Seeding Complete!'))
          .catch(error => console.log(`Error seeding data: ${ error }`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${ error }`));
};
