/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import meetupController from '../controller/Meetup';
import questionController from '../controller/Question';

import server from '../server';

let token = null;
const assert = chai.assert;

chai.use(chaiHttp);

describe('/meetup', () => {
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

  describe('/POST A MEETUP', () => {

    describe('create/post a new meetup', () => {
      it(' create/post a new meetup', (done) => {
        const newMeetup = {
          id: Date.now(),
          topic: 'JS Meetup',
          location: 'Calabar, Nigeria',
          happeningOn: '02-02-2018',
          tags: ['andela', 'lagos'],
        };

        chai.request(server)

          .post('/api/v1/meetups')
          .send(newMeetup)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            // console.log(res.body);
            assert.equal(res.status, 201);

            for (let i = 0; i < res.body.data.length; i++) {
              assert.isNotEmpty(res.body.data[i].location);
              assert.isNotEmpty(res.body.data[i].topic);
              assert.isNumber(res.body.data[i].id);
              assert.nestedProperty(res.body.data[i], 'host');
              assert.nestedProperty(res.body.data[i], 'details');
              assert.isNotEmpty(res.body.data[i].happeningOn);
              assert.isArray(res.body.data[i].tag);
            }
          });
        done();
      });
      it(' create/post with  wrong parameter meetup', (done) => {
        chai.request(server)
          .post('/api/v1/meetups')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 400);
          });
        done();
      });
    });
  });


  describe('/GET A SPECIFIC MEETUP', () => {
    describe('get a specific record in the database', () => {
      it('get a specific record in the database', (done) => {
        chai.request(server)
          .get('/api/v1/meetups/1')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 200);
            assert.isArray(res.body.data);

            if (res.body.data.length === 0) {
              assert.equal(res.body.status, 200);
              assert.include(res.body.message, 'Request successful but result contains no data, no meetup record found for id');
            } else {
              assert.equal(res.body.data.length, 1);
              assert.equal(res.body.status, 200);
              assert.isNotEmpty(res.body.data[0].location);
              assert.isNotEmpty(res.body.data[0].topic);
              assert.isNumber(res.body.data[0].id);
              assert.nestedProperty(res.body.data[0], 'host');
              assert.nestedProperty(res.body.data[0], 'details');

              assert.isNotEmpty(res.body.data[0].happeningon);
            }
          });
        done();
      });
    });
  });

  describe('/GET ALL MEETUPS ', () => {
    describe('/controller has getAllMeetupsRecord function', () => {
      it('Assert controller has a getAllMeetupsRecord function ', (done) => {
        assert.isFunction(meetupController.getAllMeetupsRecord);
        done();
      });
    });

    describe('get all meetups record in the database', () => {
      it('get all records in the database', (done) => {
        chai.request(server)
          .get('/api/v1/meetups')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 200);
            assert.isArray(res.body.data);

            if (res.body.data.length === 0) {
              assert.equal(res.body.status, 200);
              assert.equal(res.body.message, 'Request successful but result contains no data, probably no meetup records');
            } else {
              for (let i = 0; i < res.body.data.length; i++) {
                assert.isNotEmpty(res.body.data[i].location);
                assert.isNotEmpty(res.body.data[i].topic);
                assert.isNumber(res.body.data[i].id);
                assert.nestedProperty(res.body.data[i], 'host');
                assert.nestedProperty(res.body.data[i], 'details');

                assert.isNotEmpty(res.body.data[i].happeningon);
              }
            }
          });
        done();
      });
    });
  });

  describe('/GET UPCOMING MEETUPS ', () => {
    describe('/controller has upcomingMeetups function', () => {
      it('Assert controller has a upcomingMeetups function ', (done) => {
        assert.isFunction(meetupController.upcomingMeetups);
        done();
      });
    });

    describe('get all upcomingMeetups', () => {
      it('get all upcomingMeetups', (done) => {
        chai.request(server)
          .get('/api/v1/meetups/upcomingmeetups')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 200);
            assert.isArray(res.body.data);

            if (res.body.data.length === 0) {
              assert.equal(res.body.status, 200);
              assert.equal(res.body.message, 'Request successful but result contains no data, probably no upcoming meetup');
            } else {
              for (let i = 0; i < res.body.data.length; i++) {
                assert.isNotEmpty(res.body.data[i].location);
                assert.isNotEmpty(res.body.data[i].topic);
                assert.isNumber(res.body.data[i].id);
                assert.nestedProperty(res.body.data[i], 'host');
                assert.nestedProperty(res.body.data[i], 'details');

                assert.isNotEmpty(res.body.data[i].happeningon);
              }
            }
          });
        done();
      });
    });
  });

  describe('/DELETE A SPECIFIC MEETUP', () => {
    describe('/controller has deleteMeetup function', () => {
      it('Assert controller has a deleteMeetup function ', (done) => {
        assert.isFunction(meetupController.deleteMeetup);
        done();
      });
    });

    describe('/DELETE a specific record ', () => {
      it('delete a specific record ', (done) => {
        chai.request(server)
          .delete('/api/v1/meetups/50')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.status, 200);
            if (res.body.status === 404) {
              assert.include(res.body.error, 'Request unsuccessful');
            } else {
              assert.equal(res.body.status, 200);
              assert.isArray(res.body.data);
            }
          });
        done();
      });
    });
  });

  describe('/ADD IMAGE TO A SPECIFIC MEETUP', () => {
    describe('/controller has add image function', () => {
      it('Assert controller has a add image function ', (done) => {
        assert.isFunction(meetupController.addImage);
        done();
      });
      it(' wrong image parameter', (done) => {
        chai.request(server)
          .post('/api/v1/meetups/2/images')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 400);
          });
        done();
      });

      it(' add image', (done) => {
        chai.request(server)
          .post('/api/v1/meetups/2/images')
          .set('Authorization', `Bearer ${token}`)
          .send({
            images: 'linkto',
            images: 'palog',
          })
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 201);
            // assert.isArray(res.body.data.images);
          });
        done();
      });

      it(' wrong tags parameter', (done) => {
        chai.request(server)
          .post('/api/v1/meetups/2/tags')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 400);
          });
        done();
      });

      it(' add tags', (done) => {
        chai.request(server)
          .post('/api/v1/meetups/2/tags')
          .set('Authorization', `Bearer ${token}`)
          .send({
            tags: 'books',
            tags: 'lfa',
          })
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 201);
            // assert.isArray(res.body.data.tags);
          });
        done();
      });
    });
  });

  
  describe('/POST A QUESTION', () => {
    describe('/question controller', () => {
      it('Assert question controller has a createQuestion function ', (done) => {
        assert.isFunction(questionController.createQuestion);
        done();
      });
    });

    describe('incorrect api endpoint', () => {
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
          .put('/api/v1/questions/1/upvote')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
          });
        done();
      });
    });
  });


  describe('/object', () => {
    describe('upvote a question', () => {
      it(' upvote', (done) => {
        chai.request(server)
          .put('/api/v1/questions/1/upvote')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            assert.isObject(res.body);
            assert.equal(res.body.status, 201);
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

    it('confirm login', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'assaadebajo.oluwaseyi@gmail.com',
          password: 'a1b2c3d4e5',
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