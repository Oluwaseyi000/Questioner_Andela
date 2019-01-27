import chai from 'chai';
import Users from '../model/User';
import Rsvps from '../model/Rsvps';
import server from '../server';
import userController from '../controller/User';
let token=null;

let expect = chai.expect;


let assert = chai.assert;


describe('/RSVP A MEETUP', () => {
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
   describe('/user controller', done => {
      it('Assert user controller has a rsvps function ', done => {
         assert.isFunction(userController.createRsvps);
         assert.isFunction(userController.userSignup);
         assert.isFunction(userController.userLogin);
         assert.isFunction(userController.resetPassword);
         done();
      })
   })

   describe('rsvps  a meetup', () => {

      it('rsvp a meetup', done => {
        
         const rsvp = {
           
            status: 'not coming',
         }

         chai.request(server)
            .post('/api/v1/meetups/3/rsvps')
            .set('Authorization', `Bearer ${token}`)
            .send(rsvp)
            .end((err, res) => {

               
               assert.isObject(res.body);
              
               done();
            });
      })
   })


})
