import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import Meetups from '../model/Meetup';
import meetupController from '../controller/Meetup';
let assert = chai.assert;

chai.use(chaiHttp);
describe('/NON-PERSISTENCE DATABASE', () => {
   it('Assert non-persistence database using array', done => {

      assert.isArray(Meetups);
      done();
   })
})

describe('/POST A MEETUP', () => {
   describe('/controller has createMeetup function', done => {
      it('Assert controller has a createMeetup function ', done => {
         assert.isFunction(meetupController.createMeetup);
         done();
      })
   })
   describe('create/post a new meetup', () => {      it(' create/post a new meetup', done => {
         let newMeetup = {
            id: Date.now(),
            topic: "JS Meetup",
            location: 'Calabar, Nigeria',
            happeningOn: 'Janaury 7th, 2018',
            tags: ['andela', 'lagos']
         }

         chai.request(server)
            .post('/api/v1/meetups')
            .send(newMeetup)
            .end((err, res) => {
               assert.isNotEmpty(res.body);
               assert.equal(res.status, 201);
               assert.equal(res.body.status, 201);
               assert.equal(res.body.message, 'New meetup successfully created ');

               for (let i = 0; i < res.body.data.length; i++) {
                  assert.isNotEmpty(res.body.data[i].location);
                  assert.isNotEmpty(res.body.data[i].topic);
                  assert.isNumber(res.body.data[i].id);
                  assert.nestedProperty(res.body.data[i], 'host');
                  assert.nestedProperty(res.body.data[i], 'details');
                  assert.nestedProperty(res.body.data[i], 'coverImage');
                  assert.isNotEmpty(res.body.data[i].happeningOn);
                  assert.isArray(res.body.data[i].tag);
               }
            });
         done();
      })
   })
})
describe('/GET A SPECIFIC MEETUP', () => {
   describe('/controller has getAllMeetups function', done => {
      it('Assert controller has a getASpecificMeetupRecord function ', done => {
         assert.isFunction(meetupController.getASpecificMeetupRecord);
         done();
      })
   })
   describe('get a specific record in the database', done => {
      it('get a specific record in the database', done => {
         chai.request(server)
            .get('/api/v1/meetups/:meetupId')
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.status, 200);

               if (res.body.data===undefined) {
                  assert.equal(res.status, 200);
               } else {
                  assert.isObject(res.body.data);
                  assert.equal(res.body.status, 200);
                  assert.isNotEmpty(res.body.data.location);
                  assert.isNotEmpty(res.body.data.topic);
                  assert.isNumber(res.body.data.id);
                  assert.nestedProperty(res.body.data, 'host');
                  assert.nestedProperty(res.body.data, 'details');
                  assert.nestedProperty(res.body.data, 'coverImage');
                  assert.isNotEmpty(res.body.data.happeningOn);
                  assert.isArray(res.body.data.tags);
               }
            });
         done();
      })
   })

})
describe('/GET ALL MEETUPS ', () => {

   describe('/controller has getAllMeetupsRecord function', done => {
      it('Assert controller has a getAllMeetupsRecord function ', done => {
         assert.isFunction(meetupController.getAllMeetupsRecord);
         done();
      })
   })
   describe('get all meetups record in the database', done => {
      it('get all records in the database', done => {
         chai.request(server)
            .get('/api/v1/meetups')
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
                     assert.nestedProperty(res.body.data[i], 'coverImage', 'hHAS');
                     assert.isNotEmpty(res.body.data[i].happeningOn);
                     assert.isArray(res.body.data[i].tag);
                  }
               }
            });
         done();
      })
   })
})

describe('/GET UPCOMING MEETUPS ', () => {
   describe('/controller has upcomingMeetups function', done => {
      it('Assert controller has a upcomingMeetups function ', done => {
         assert.isFunction(meetupController.upcomingMeetups);
         done();
      })
   })
   describe('get all upcomingMeetups', done => {
      it('get all upcomingMeetups', done => {
         chai.request(server)
            .get('/api/v1/meetups/upcomingmeetups')
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.status, 200);
               assert.isArray(res.body.data);

               if (res.body.data.length === undefined) {
                  assert.equal(res.body.status, 200);
               } else {
                  for (let i = 0; i < res.body.data.length; i++) {
                     assert.isNotEmpty(res.body.data[i].location);
                     assert.isNotEmpty(res.body.data[i].topic);
                     assert.isNumber(res.body.data[i].id);
                     assert.nestedProperty(res.body.data[i], 'host');
                     assert.nestedProperty(res.body.data[i], 'details');
                     assert.nestedProperty(res.body.data[i], 'coverImage');
                     assert.isNotEmpty(res.body.data[i].happeningOn);
                     assert.isArray(res.body.data[i].tag);
                  }
               }
            });
         done();
      })
   })
})

describe('/DELETE A SPECIFIC MEETUP', () => {
   describe('/controller has deleteMeetup function', done => {
      it('Assert controller has a deleteMeetup function ', done => {
         assert.isFunction(meetupController.deleteMeetup);
         done();
      })
   })
   describe('/DELETE a specific record ', done => {
      it('delete a specific record ', done => {
         chai.request(server)
            .delete('/api/v1/meetups/:meetupId')
            .end((err, res) => {
               assert.isObject(res.body);
               
               if (res.body.status === 404) {
                  assert.include(res.body.error, 'Request unsuccessful');
               } else {
                  assert.equal(res.body.status, 200);
                  assert.include(res.body.message, 'Delete Successful');
               }
            });
         done();
      })
   })
})