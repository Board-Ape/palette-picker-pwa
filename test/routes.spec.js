const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should display the homepage correctly', () => {
    chai.request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.includes('Palette Picker');
      })
      .catch(error => {
        throw error;
      });
  });

  it('should return a 404 if the route does not exist', () => {
    chai.request(server)
      .get('/poorRoutePath')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(error => {
        throw error;
      });
  });
});

describe('API Routes', () => {
  // before((done) => {
  //   database.migrate.latest()
  //     .then( () => done())
  //     .catch(error => {
  //       throw error;
  //     });
  // });
  //
  // beforeEach((done) => {
  //   database.seed.run()
  //     .then(() => done())
  //     .catch(error => {
  //       throw error;
  //     });
  // });

  describe('GET /api/v1/projects', () => {
    it('should get projects from database', (done) => {
      chai.request(server)
        .get('/api/v1/projects')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Initial Project');
          done();
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return 404 for a bad URL', (done) => {
      chai.request(server)
        .get('/api/v1/sad')
        .then(response => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/palettes', () => {
    it('should get palettes from database', (done) => {
      chai.request(server)
        .get('/api/v1/palettes')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Dark');
          response.body[0].should.have.property('hex1');
          response.body[0].hex1.should.equal('#1E3FDA');
          response.body[0].should.have.property('hex2');
          response.body[0].hex2.should.equal('#373F5E');
          response.body[0].should.have.property('hex3');
          response.body[0].hex3.should.equal('#2F1988');
          response.body[0].should.have.property('hex4');
          response.body[0].hex4.should.equal('#7C096B');
          response.body[0].should.have.property('hex5');
          response.body[0].hex5.should.equal('#2E2817');
          response.body[0].should.have.property('project_id');
          response.body[0].project_id.should.equal(1);
          done();
        })
        .catch(error => {
          throw error;
        });
    });

    it('should return status 500 if project does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/projects/*/palettes')
        .then(response => {
          response.should.have.status(500);
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  // describe('POST /api/v1/projects/', () => {
  //   it('should add a new project in the database', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/projects')
  //       .send({
  //         id: 2,
  //         name: 'People Try'
  //       })
  //       .then(response => {
  //         response.should.have.status(201);
  //         response.body.should.be.a('array');
  //         response.body.length.should.equal(1);
  //         response.body[0].should.have.property('id');
  //         response.body[0].id.should.equal(2);
  //         response.body[0].should.have.property('name');
  //         response.body[0].name.should.equal('People Try');
  //
  //         chai.request(server)
  //           .get('/api/v1/projects')
  //           .then(response => {
  //             response.should.have.status(200);
  //             response.should.be.json;
  //             response.body.should.be.a('array');
  //             response.body.length.should.equal(1);
  //             done();
  //           })
  //           .catch(error => {
  //             throw error;
  //           });
  //       });
  //   });
  // });
  //
  // describe('POST /api/v1/projects', () => {
  //   it('should add a new palette to the database', () => {
  //     chai.request(server)
  //       .post('/api/v1/palettes')
  //       .send({
  //         id: 3,
  //         name: 'My Toned Glutes',
  //         hex1: '#558F7E',
  //         hex2: '#A51425',
  //         hex3: '#29EA6A',
  //         hex4: '#049D9A',
  //         hex5: '#C933BA',
  //         project_id: project[0]
  //       })
  //       .then(response => {
  //         response.should.have.status(201);
  //         response.body.should.be.a('array');
  //         response.body.length.should.equal(1);
  //         response.body[0].should.have.property('id');
  //         response.body[0].id.should.equal(3);
  //         response.body[0].should.have.property('name');
  //         response.body[0].name.should.equal('My Toned Glutes');
  //
  //         chai.request(server)
  //           .get('/api/v1/projects/1/palettes')
  //           .then(response => {
  //             response.should.have.status(200);
  //             response.should.be.json;
  //             response.body.should.be.a('array');
  //             response.body.length.should.equal(3);
  //             response.body[2].should.have.property('id');
  //             response.body[2].id.should.equal(3);
  //             response.body[2].should.have.property('name');
  //             response.body[2].name.should.equal('My Toned Glutes');
  //             response.body[2].should.have.property('hex1');
  //             response.body[2].hex1.should.equal('#558F7E');
  //             response.body[2].should.have.property('hex2');
  //             response.body[2].hex2.should.equal('#A51425');
  //             response.body[2].should.have.property('hex3');
  //             response.body[2].hex3.should.equal('#29EA6A');
  //             response.body[2].should.have.property('hex4');
  //             response.body[2].hex4.should.equal('#049D9A');
  //             response.body[2].should.have.property('hex5');
  //             response.body[2].hex5.should.equal('#C933BA');
  //             response.body[2].should.have.property('project_id');
  //             response.body[2].project_id.should.equal(1);
  //             done();
  //           })
  //           .catch(error => {
  //             throw error;
  //           });
  //       });
  //   });
  // });

});
