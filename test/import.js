let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:3000';
var fs = require('fs');

describe('Import Vehicles from CSV: ', () => {
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
 
    it('should insert Vehicles', (done) => {
        chai.request(url)
            .post('/autofi/import/csv')
            .attach('file', fs.readFileSync('./vehicles-template.csv'),  'vehicles-template.csv')
            .field('providerName', 'Test Provider')
            .end(function (err, res) {
                expect(res).to.have.status(201);
                done();
            });
    });
});