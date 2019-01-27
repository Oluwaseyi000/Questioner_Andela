import chai from 'chai';
import chaiHttp from 'chai-http';
import Meetups from '../model/Meetup';
import meetupController from '../controller/Meetup';
import server from '../server';
let token=null;
let assert = chai.assert;
let expect = chai.expect;

chai.use(chaiHttp);

describe('/meetup', ()=>{
   before(done => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
         email:'adebajo.oluwaseyi@gmail.com',
         password: 'a1b2c3d4e5'
      })
      .end((err,res)=>{
         assert.isObject(res.body);
          token= res.body.data[0].token;
         done();
      })
   });

describe('/POST A MEETUP', () => {
   describe('/controller has createMeetup function', done => {
      it('Assert controller has a createMeetup function ', done => {
         assert.isFunction(meetupController.createMeetup);
         done();
      })
   })
  
   describe('create/post a new meetup', () => {
      it(' create/post a new meetup', done => {
         let newMeetup = {
            id: Date.now(),
            topic: "JS Meetup",
            location: 'Calabar, Nigeria',
            happeningOn: '02-02-2018',
            tags: ['andela', 'lagos']
         }

         chai.request(server)

            .post('/api/v1/meetups')
            .send(newMeetup)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.status, 200);

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
      })
      it(' create/post with  wrong parameter meetup', done => {
        
         chai.request(server)
            .post('/api/v1/meetups')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.status, 400)
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
            .get('/api/v1/meetups/2')
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
      })
   })
})

describe('/ADD IMAGE TO A SPECIFIC MEETUP', () => {

   describe('/controller has add image function', done => {
      it('Assert controller has a add image function ', done => {
         assert.isFunction(meetupController.addImage);
         done();
      })
      it(' wrong image parameter', done => {
         chai.request(server)
            .post('/api/v1/meetups/2/images')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.body.status, 400);
            });
         done();
      })

      it(' add image', done => {
         chai.request(server)
            .post('/api/v1/meetups/2/images')
            .set('Authorization', `Bearer ${token}`)
            .send({
               images: 'linkto',
               images: 'palog'
            })
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.body.status, 201);
               // assert.isArray(res.body.data.images);
            });
         done();
      })

      it(' wrong tags parameter', done => {
         chai.request(server)
            .post('/api/v1/meetups/2/tags')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.body.status, 400);
            });
         done();
      })

      it(' add tags', done => {
         chai.request(server)
            .post('/api/v1/meetups/2/tags')
            .set('Authorization', `Bearer ${token}`)
            .send({
               tags: 'books',
               tags: 'lfa'
            })
            .end((err, res) => {
               assert.isObject(res.body);
               assert.equal(res.body.status, 201);
               // assert.isArray(res.body.data.tags);
            });
         done();
      })
      


      
   })

   
})

describe('/ADD TAG TO A SPECIFIC MEETUP', () => {

   describe('/controller has add tag function', done => {
      it('Assert controller has a add tag function ', done => {
         assert.isFunction(meetupController.addTag);
         done();
      })
   })

  
})
})