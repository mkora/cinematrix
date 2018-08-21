import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing API', () => {
  describe('GET /notfound', () => {
    it('it should return 404 ERROR', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/index', () => {
    it('it should return 200 OK', (done) => {
      chai.request(server)
        .get('/api/index')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });  
});

