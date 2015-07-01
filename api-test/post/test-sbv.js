'use strict';

var request = require('supertest');

module.exports = function(app){

  var _id = '';



  describe('sbv', function(){
    describe('POST New Sbv', function(){
      it('creates new sbv and responds with json success message', function(done){
        request(app)
        .post('/api/sbv')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          'title': 'Hell Is Other Robots'
        })
        .expect(201)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          _id = res.body._id;
          done();
        });
      });
    });

    describe('GET List of Sbvs', function(){
      it('responds with a list of sbv items in JSON', function(done){
        request(app)
        .get('/api/sbvs')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      });
    });

    describe('GET Sbv by ID', function(){
      it('responds with a single sbv item in JSON', function(done){
        request(app)
        .get('/api/sbv/' + _id )
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
      });
    });


    describe('PUT Sbv by ID', function(){
      it('updates sbv item in return JSON', function(done){
        request(app)
        .put('/api/sbv/' + _id )
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({ 'title': 'Hell Is Where There Are No Robots' })
        .expect(200, done);
      });
    });

    describe('DELETE Sbv by ID', function(){
      it('should delete sbv and return 204 status code', function(done){
        request(app)
        .del('/api/sbv/' + _id)
        .expect(204, done);
      });
    });
  });
};
