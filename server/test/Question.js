import chai from 'chai';
import Questions from '../model/Question';
import Votes from '../model/Vote';

let assert = chai.assert;

describe('/PERSISTENCE DATABASE', () => {
   it('Assert persistence database', done => {
      assert.exists(Questions);
      done();
   })
})

describe('/PERSISTENCE DATABASE', () => {
   it('Assert persistence database', done => {
      assert.exists(Votes);
      done();
   })
})
