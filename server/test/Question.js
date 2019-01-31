/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import questionController from '../controller/Question';
import userController from '../controller/User';


const assert = chai.assert;
let token = null;
chai.use(chaiHttp);

describe('/QUESTION', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'adebajo.oluwaseyi@gmail.com',
        password: 'a1b2c3d4e5',
      })
      .end((err, res) => {
        assert.isObject(res.body);
        token = res.body.data[0].token;
        done();
      });
  });


  describe('/POST A QUESTION', () => {
    describe('/question controller', () => {
      it('Assert question controller has a createQuestion function ', (done) => {
        assert.isFunction(questionController.createQuestion);
        done();
      });
    });

    describe('incorrect pai endpoin', () => {
      it(' incorrect endpoint', (done) => {
        chai.request(server)
          .post('/api/v1/incorrectapi')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 404);
            assert.equal(res.status, 404);
          });
        done();
      });

      it(' create/post a new question', (done) => {
        const newQuestion = {

          meetupId: 1,
          title: 'react',
          body: 'let go react',
        };

        chai.request(server)
          .post('/api/v1/questions')
          .send(newQuestion)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 201);
            assert.equal(res.status, 201);
          });
        done();
      });

      it(' create/post a new question', (done) => {
        chai.request(server)
          .post('/api/v1/questions')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 400);
          });
        done();
      });

      it(' upvote question', (done) => {
        chai.request(server)
          .patch('/api/v1/questions/1/upvote')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 200);
            assert.equal(res.status, 200);
          });
        done();
      });
    });
  });


  describe('/object', () => {
    describe('/question controller', () => {
      it('Assert question controller has a voteQuestion function ', (done) => {
        assert.isFunction(questionController.downvote);
        assert.isFunction(questionController.upvote);
        assert.isFunction(questionController.addComment);
        done();
      });
    });

    describe('upvote a question', () => {
      it(' upvote', (done) => {
        chai.request(server)
          .patch('/api/v1/questions/1/upvote')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 200);
            assert.isArray(res.body.data);
          });
        done();
      });
    });

    describe('downvote a question', () => {
      it(' downvote', (done) => {
        chai.request(server)
          .patch('/api/v1/questions/1/downvote')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 200);
            assert.isArray(res.body.data);
          });
        done();
      });
    });


    describe('add wrong comment', () => {
      it('wrong comment parameter', (done) => {
        chai.request(server)
          .post('/api/v1/comments')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 400);
          });
        done();
      });
    });


    describe('/user controller', () => {
      it('Assert user controller has a rsvps function ', (done) => {
        assert.isFunction(userController.createRsvps);
        assert.isFunction(userController.userSignup);
        assert.isFunction(userController.userLogin);
        assert.isFunction(userController.resetPassword);
        done();
      });
    });

    it('confirm login', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'adebajo.oluwaseyi@gmail.com',
          password: 'a1b2cjj3d4e5',
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.equal(res.status, 401);
          done();
        });
    });

    it('confirm login', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .end((err, res) => {
          assert.isObject(res.body);
          assert.equal(res.status, 400);
          done();
        });
    });


    it('signup', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'first',
          lastname: 'last',
          email: 'email@email.com',
          password: 'password',
        })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.oneOf(res.body.status, [201, 400]);
          done();
        });
    });

    it('confirm wrong login', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .end((err, res) => {
          assert.isObject(res.body);
          assert.equal(res.status, 400);
          done();
        });
    });

    describe('rsvps  a meetup', () => {
      it('wrong rsvp a meetup', (done) => {
        chai.request(server)
          .post('/api/v1/meetups/3/rsvps')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 400);
            done();
          });
      });

      it('reset password', (done) => {
        chai.request(server)
          .patch('/api/v1/user/reset-password')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 400);
            done();
          });
      });

      it('reset password', (done) => {
        chai.request(server)
          .patch('/api/v1/user/reset-password')
          .set('Authorization', `Bearer ${token}`)
          .send({
            userId: 20,
            newPwd: 'a1b2c3d4e5',
          })
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 200);
            done();
          });
      });

      it('reset password', (done) => {
        chai.request(server)
          .patch('/api/v1/user/reset-password')
          .set('Authorization', `Bearer ${token}`)
          .send({
            userId: '4dgh',
            newPwd: 'a1b2c3d4e5',
          })
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 400);
            done();
          });
      });
    });
  });
});
