
let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;

let server = require('../server');
let Meetups = require('../model/Meetup');
let meetupController = require('../controller/Meetup');
let routes =require('../routes');


chai.use(chaiHttp);
describe('/NON-PERSISTENCE DATABASE', ()=>{
   it('Assert non-persistence database using array', done=>{
      assert.isArray(Meetups);
      done();
   })
})

describe('/controller has createMeetup function', done=>{
   it('Assert controller has a createMeetup function ', done=>{
      assert.isFunction(meetupController.createMeetup);
      done();
  }) 
})


describe('/POST A MEETUP', () => {
   beforeEach(done => {
      Meetups = [];
      done();
   });

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
                  assert.nestedProperty(res.body.data[i],'host');
                  assert.nestedProperty(res.body.data[i],'details');
                  assert.nestedProperty(res.body.data[i],'coverImage');
                  assert.isNotEmpty(res.body.data[i].happeningOn);
                  assert.isArray(res.body.data[i].tag);
                 
               }
            });
         done();
      })
      afterEach(done => {
         Meetups = [];
         done();
      });
   
})