import chai from 'chai';
import chaiHttp from 'chai-http';
import Meetups from '../model/Meetup';
import meetupController from '../controller/Meetup';
import server from '../server';
// import request  from ('supertest')('http://localhost:8000');
let token;;
let assert = chai.assert;
let expect = chai.expect;

chai.use(chaiHttp);

describe('/test meetup', ()=>{


describe('/PERSISTENCE DATABASE', () => {

   

   it('Assert persistence database ', done => {
      assert.exists(Meetups);
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
   
})
describe('/GET A SPECIFIC MEETUP', () => {
   describe('/controller has getAllMeetups function', done => {
      it('Assert controller has a getASpecificMeetupRecord function ', done => {
         assert.isFunction(meetupController.getASpecificMeetupRecord);
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
   
})

describe('/GET UPCOMING MEETUPS ', () => {
   describe('/controller has upcomingMeetups function', done => {
      it('Assert controller has a upcomingMeetups function ', done => {
         assert.isFunction(meetupController.upcomingMeetups);
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
   
})
})