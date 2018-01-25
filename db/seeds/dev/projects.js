exports.seed = function(knex, Promise) {

  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          id: 1,
          name: 'idea box'
        }, 'id')
          .then(project => {
            return knex('palettes').insert([
              {
                id: 1,
                name: 'Dark',
                hex1: '#769DA3',
                hex2: '#5CF36D',
                hex3: '#2236DA',
                hex4: '#DBA028',
                hex5: '#BC601A',
                project_id: project[0]
              },
              {
                id: 2,
                name: 'Bland',
                hex1: '#1324MO',
                hex2: '#000234',
                hex3: '#ALSDK1',
                hex4: '#234NN2',
                hex5: '#034M5L',
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
