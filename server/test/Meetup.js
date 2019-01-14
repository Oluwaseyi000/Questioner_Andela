import chai from 'chai';
import chaiHttp from 'chai-http';
import Meetups from '../model/Meetup';

let assert = chai.assert;

chai.use(chaiHttp);
describe('/PERSISTENCE DATABASE', () => {
   it('Assert persistence database using array', done => {
      assert.exists(Meetups);
      done();
   })
})