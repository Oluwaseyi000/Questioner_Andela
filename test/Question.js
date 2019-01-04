let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;

let server = require('../server');

let Questions = require('../model/Question');
let questionController = require('../controller/Question');


chai.use(chaiHttp);
describe('/NON-PERSISTENCE DATABASE', () => {

   it('Assert non-persistence database using array', done => {

      assert.isArray(Questions);
      done();
   })
})

describe('/POST A QUESTION', () => {
   describe('/question controller', done => {
      it('Assert question controller has a createQuestion function ', done => {
         assert.isFunction(questionController.createQuestion);
         done();
      })
   })
   beforeEach(done => {
      Questions = [];
      done();
   });
   describe('create/post a new question', () => {
      it(' create/post a new question', done => {
         let newQuestion = {
            id: Date.now(),
            userId: 2,
            meetupId: 3,
            title: 'req.body.title',
            body: 'req.body.body'
         }

         chai.request(server)

            .post('/api/v1/questions')
            .send(newQuestion)
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.status, 200);
               assert.equal(res.body.status, 201);
               assert.include(res.body.message, 'Your questions is  successfully created');

               for (let i = 0; i < res.body.data.length; i++) {                
                    assert.isNumber(res.body.data[i].id);

                  assert.isNotEmpty(res.body.data[i].createdBy);
                  assert.isNotEmpty(res.body.data[i].createdOn);
                  assert.nestedProperty(res.body.data[i],'votes');
                  assert.nestedProperty(res.body.data[i], 'downvotes');
               }
            });
         done();
      })
   })


   afterEach(done => {
      Questions = [];
      done();
   });

})