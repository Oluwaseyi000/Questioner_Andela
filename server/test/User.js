import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import routes from '../routes';

import Meetups from '../model/Meetup';
import userController from '../controller/User';

let assert = chai.assert;

describe('/RSVP A MEETUP', () => {
   describe('/user controller', done => {
      it('Assert user controller has a rsvps function ', done => {
         assert.isFunction(userController.createRsvps);

         done();
      })
   })
   describe('rsvps  a meetup', () => {
      it('rsvp a meetup', done => {

         const newMeetup = {
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
            .post('/api/v1/meetups/4/rsvps')
            .send(rsvp)
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.status, 200);
               assert.isArray(res.body.data),
                  assert.isNotEmpty(res.body.data[0].meetup)
               assert.isNotEmpty(res.body.data[0].status)
               done();
            });

         chai.request(server)
            .post('/api/v1/meetups/sdnhkdsjhk/rsvps')
            .send(rsvp)
            .end((err, res) => {
               assert.equal(res.status, 500);
            })

         const rsvpFail = {
            userId: 3
         }
         chai.request(server)
            .post('/api/v1/meetups/4/rsvps')
            .send(rsvpFail)
            .end((err, res) => {
               assert.equal(res.body.status, 400);
            })
      })
   })
})