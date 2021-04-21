let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:3000';
var fs = require('fs');

describe('Import Vehicles from CSV', () => {
    it('should not insert Vehicles', (done) => {
        chai.request(url)
            .post('/autofi/import/csv')
            .send({})
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(400);
                done();
            });
    });
    it('Should insert Vehicles provider 1', (done) => {
        chai.request(url)
            .post('/autofi/import/csv')
            .attach('file', fs.readFileSync('./unit_testing_data/vehicles-template_provider1.csv'),  'vehicles-template_provider1.csv')
            .field('providerName', 'Provider 1')
            .end(function (err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });

    it('Should insert Vehicles provider 2', (done) => {
        chai.request(url)
            .post('/autofi/import/csv')
            .attach('file', fs.readFileSync('./unit_testing_data/vehicles-template_provider2.csv'),  'vehicles-template_provider2.csv')
            .field('providerName', 'Provider 2')
            .end(function (err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });
});



describe('Import Vehicles from txt file', () => {
    it('Should not insert Vehicles', (done) => {
        chai.request(url)
            .post('/autofi/import/csv')
            .attach('file', fs.readFileSync('./unit_testing_data/vehicles-template.txt'),  'vehicles-template.txt')
            .field('providerName', 'Provider 1')
            .end(function (err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });
});