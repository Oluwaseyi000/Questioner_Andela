import chai from 'chai';
import Users from '../model/User';
import Rsvps from '../model/Rsvps';

let assert = chai.assert;

describe('/PERSISTENCE DATABASE', () => {
   it('Assert persistence database', done => {
      assert.exists(Users);
      done();
   })
})

describe('/PERSISTENCE DATABASE', () => {
   it('Assert persistence database', done => {
      assert.exists(Rsvps);
      done();
   })
})