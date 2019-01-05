let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;
let server = require('../server');
let Meetups = require('../model/Meetup');
let meetupController = require('../controller/Meetup');
let routes = require('../routes');

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
   beforeEach(done => {
      Meetups = [];
      done();
   });
   describe('create/post a new meetup', done => {
      it(' create/post a new meetup', done => {
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
               assert.isObject(res.body);
               assert.equal(res.status, 200);
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

   afterEach(done => {
      Meetups = [];
      done();
   });

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
               assert.isArray(res.body.data);

               if (res.body.data.length === 0) {
                  assert.equal(res.body.status, 204);
                  assert.equal(res.body.message, 'Request successful but result contains no data, probably a case of non existence meetup id');

               } else {
                  assert.equal(res.body.data.length, 1);
                  assert.equal(res.body.status, 200);
                  assert.isNotEmpty(res.body.data[0].location);
                  assert.isNotEmpty(res.body.data[0].topic);
                  assert.isNumber(res.body.data[0].id);
                  assert.nestedProperty(res.body.data[0], 'host');
                  assert.nestedProperty(res.body.data[0], 'details');
                  assert.nestedProperty(res.body.data[0], 'coverImage');
                  assert.isNotEmpty(res.body.data[0].happeningOn);
                  assert.isArray(res.body.data[0].tags);
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
                  assert.equal(res.body.status, 204);
                  assert.equal(res.body.message, 'Request successful but result contains no data, probably no meetup records');

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

               if (res.body.data.length === 0) {
                  assert.equal(res.body.status, 204);
                  assert.equal(res.body.message, 'Request successful but result contains no data, probably no upcoming meetup');

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