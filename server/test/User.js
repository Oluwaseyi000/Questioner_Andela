let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;

let server = require('../server');

let userController = require('../controller/User');
let Meetups = require('../model/Meetup');
let Rsvps = require('../model/Rsvps');


describe('/RSVP A MEETUP', () => {
   describe('/user controller', done => {
      it('Assert user controller has a rsvps function ', done => {
         assert.isFunction(userController.rsvps);
         done();
      })
   })

   describe('rsvps  a meetup', () => {

      it('rsvp a meetup', done => {
         let newMeetup = {
            id: 4,
            topic: 'req.body.topic',
            location: 'req.body.location',
            happeningOn: '28-02-2018',
            createdOn: new Date()
         }
         const rsvp = {
            userId: 2,
            meetupId: 4,
            status: 'req.body.status',
         }
         Meetups.push(newMeetup);

         chai.request(server)
            .post('/api/v1//meetups/4/rsvps')
            .send(rsvp)
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.status, 200);
               assert.isArray(res.body.data),
                  assert.isNotEmpty(res.body.data[0].meetup)
               assert.isNotEmpty(res.body.data[0].status)
               done();
            });
      })
   })






})