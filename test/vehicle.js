'use strict'

const server = require('../app');
const request = require('supertest')(server);
const expect = require('chai').expect;
const Mock = require('./data/mock');

describe('[GET] /vehicles/2015/Audi/A3  Get Vehicle Info from NHTSA API', function () {
    this.timeout(15000);
    it('It should return vehicle detail based on the year, manufacturer and model.', function () {
        return request.get('/vehicles/2015/Audi/A3')
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['Count', 'Results']);
            });
    });
});

describe('[GET] /vehicles/undefined/Audi/A3  Get Vehicle Info from NHTSA API', function () {
    this.timeout(5000);
    it('It should return empty record.', function () {
        return request.get('/vehicles/undefined/Audi/A3')
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['Count', 'Results']);
                expect(res.body.Count).to.eql(0);
                expect(res.body.Results).to.eql([]);
            });
    });
});

describe('[GET] /vehicles/2015/Audi/A3?withRating=true  Get Vehicle Info from NHTSA API', function () {
    this.timeout(15000);
    it('It should return vehicle detail based on the year, manufacturer and model with over rating.', function () {
        return request.get('/vehicles/2015/Audi/A3?withRating=true')
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['Count', 'Results']);
            });
    });
});

describe('[GET] /vehicles/2015/Audi/A3?withRating=false  Get Vehicle Info from NHTSA API', function () {
    this.timeout(5000);
    it('It should return vehicle detail based on the year, manufacturer and model without over rating.', function () {
        return request.get('/vehicles/2015/Audi/A3?withRating=false')
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['Count', 'Results']);
            });
    });
});

describe('[GET] /vehicles/2015/Audi/A3?withRating=bananas  Get Vehicle Info from NHTSA API', function () {
    this.timeout(5000);
    it('It should return vehicle detail based on the year, manufacturer and model without over rating.', function () {
        return request.get('/vehicles/2015/Audi/A3?withRating=bananas')
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['Count', 'Results']);
            });
    });
});

describe('[POST] /vehicles Request for vehicle Info from NHTSA API', function () {
    this.timeout(5000);
    it('It should return vehicle detail based on the year, manufacturer and model.', function () {
        return request.post('/vehicles')
            .send(Mock.getValidPayload())
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['Count', 'Results']);
                expect(res.body).to.have.property('Results');
            })
    });
});

describe('[POST] /vehicles Request for vehicle Info from NHTSA API', function () {
    this.timeout(5000);
    it('It should return empty record.', function () {
        return request.post('/vehicles')
            .send(Mock.getInvalidPayload())
            .set('Content-Type', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.keys(['Count', 'Results']);
                expect(res.body.Count).to.eql(0);
                expect(res.body.Results).to.eql([]);
            })
    });
});