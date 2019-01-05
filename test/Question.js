let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;

let server = require('../server');

let Questions = require('../model/Question');
let questionController = require('../controller/Question');
let Votes = require('../model/Vote');

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
      //  Questions = [];
      done();
   });
   describe('create/post a new question', () => {
      it(' create/post a new question', done => {
         let newQuestion = {
            id: Date.now(),
            userId: 2,
            meetupId: 3,
            title: 'req.body.title',
            body: 'req.body.body',
            createdBy: 2
         }

         chai.request(server)

            .post('/api/v1/questions')
            .send(newQuestion)
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.status, 200);
               assert.equal(res.body.status, 201);
               assert.include(res.body.message, 'Your questions is  successfully created');
               //assert.isArray(res.body.data);

               for (let i = 0; i < res.body.data.length; i++) {
                  assert.isNumber(res.body.data[i].id);
                  assert.exists(res.body.data[i].createdOn);
                  assert.isNumber(res.body.data[i].createdBy);
                  assert.nestedProperty(res.body.data[i], 'votes');
               }
            });
         done();
      })
   })




})



describe('/DOWNVOTE A QUESTION', () => {
   describe('/question controller', done => {
      it('Assert question controller has a voteQuestion function ', done => {
         assert.isFunction(questionController.voteQuestion);
         done();
      })
   })
   beforeEach(done => {
      Votes = [];
      done();
   });
   describe('upvote a question', () => {

      it(' upvote a question', done => {
         let newQuestion = {
            id: 14,
            userId: 2,
            meetupId: 3,
            title: 'req.body.title',
            body: 'req.body.body',
            createdBy: 2
         }
         let vote = {
            voteId: Date.now(),
            userId: 2,
            meetupId: 3,
            questionId: 14,
            voteType: 'upvote',
            body: 'req.body.body',
            title: 'ftygh'
         }
         Questions.push(newQuestion);

         chai.request(server)
            .patch('/api/v1/questions/14/upvote')
            .send(vote)

            .end((err, res) => {

               assert.isObject(res.body);
               assert.equal(res.status, 200);
               done();
            });
      })
   })



describe('/ DOWNVOTE A QUESTION', () => {
   describe('/question controller', done => {
      it('Assert question controller has a voteQuestion function ', done => {
         assert.isFunction(questionController.voteQuestion);
         done();
      })
   })
   beforeEach(done => {
      Votes = [];
      done();
   });
   describe('downvote  a question', () => {

      it('downvote a question', done => {
         let newQuestion = {
            id: 14,
            userId: 2,
            meetupId: 3,
            title: 'req.body.title',
            body: 'req.body.body',
            createdBy: 2
         }
         let vote = {
            voteId: Date.now(),
            userId: 2,
            meetupId: 3,
            questionId: 14,
            voteType: 'downvote',
            body: 'req.body.body',
            title: 'ftygh'
         }
         Questions.push(newQuestion);

         chai.request(server)
            .patch('/api/v1/questions/14/downvote')
            .send(vote)

            .end((err, res) => {

               assert.isObject(res.body);
               assert.equal(res.status, 200);
               done();
            });
      })
   })





   afterEach(done => {
      Questions = [];
      done();
   });

})


   afterEach(done => {
      Questions = [];
      done();
   });

})