// import chai from 'chai';
// import Users from '../model/User';
// import Rsvps from '../model/Rsvps';
// import server from '../server';
// import userController from '../controller/User';
// let token=null;

// let expect = chai.expect;


// let assert = chai.assert;


// describe('/USERS', () => {
//    before(done => {
//       before(done => {
//          chai.request(server)
//          .post('/api/v1/auth/login')
//          .send({
//             email:'adebajo.oluwaseyi@gmail.com',
//             password: 'a1b2c3d4e5'
//          })
//          .end((err,res)=>{
//             assert.isObject(res.body);
//              token= res.body.data[0].token;
//             done();
//          })
//       })
        
//    });
//    describe('/user controller', done => {
//       it('Assert user controller has a rsvps function ', done => {
//          assert.isFunction(userController.createRsvps);
//          assert.isFunction(userController.userSignup);
//          assert.isFunction(userController.userLogin);
//          assert.isFunction(userController.resetPassword);
//          done();
//       })
//    })

//    it('confirm login', done=>{
//       chai.request(server)
//       .post('/api/v1/auth/login')
//       .send({
//          email:'adebajo.oluwaseyi@gmail.com',
//          password: 'a1b2cjj3d4e5'
//       })
//       .end((err,res)=>{
//          assert.isObject(res.body);
//           assert.equal(res.status, 401);
//          done();
//       })
//    })

//    it('confirm login', done=>{
//       chai.request(server)
//       .post('/api/v1/auth/signup')
//       .end((err,res)=>{
//          assert.isObject(res.body);
//           assert.equal(res.status, 400);
//          done();
//       })
//    })

   
//    it('signup', done=>{
//       chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send({
//          firstname: 'first',
//          lastname: 'last',
//          email: 'email@email.com',
//          password: 'password'
//       })
//       .end((err,res)=>{
//          assert.isObject(res.body);
//           assert.oneOf(res.body.status,[201,400]);
//          done();
//       })
//    })

//    it('confirm wrong login', done=>{
//       chai.request(server)
//       .post('/api/v1/auth/login')
//       .end((err,res)=>{
//          assert.isObject(res.body);
//           assert.equal(res.status, 400);
//          done();
//       })
//    })

//    describe('rsvps  a meetup', () => {

//       it('wrong rsvp a meetup', done => {
        
      

//          chai.request(server)
//             .post('/api/v1/meetups/3/rsvps')
//             .set('Authorization', `Bearer ${token}`)
//             .end((err, res) => {
//                assert.isObject(res.body);
//                assert.equal(res.status, 400);
//                done();
//             });
//       })

//       // it('rsvp a meetup', done => {
        
//       //    const rsvp = {
           
//       //       status: 'not coming',
//       //    }

//       //    chai.request(server)
//       //       .post('/api/v1/meetups/3/rsvps')
//       //       .set('Authorization', `Bearer ${token}`)
//       //       .send(rsvp)
//       //       .end((err, res) => {
//       //          assert.isObject(res.body);
//       //          assert.equal(res.status, 201);
//       //          done();
//       //       });
//       // })

//       it('reset password', done => {
//          chai.request(server)
//             .patch('/api/v1/user/reset-password')
//             .set('Authorization', `Bearer ${token}`)
//             .end((err, res) => {
//                assert.isObject(res.body);
//                assert.equal(res.body.status, 400);
//                done();
//             });
//       })

//       it('reset password', done => {
//          chai.request(server)
//             .patch('/api/v1/user/reset-password')
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                userId: 20,
//                newPwd: 'a1b2c3d4e5'
//             })
//             .end((err, res) => {
//                assert.isObject(res.body);
//                assert.equal(res.body.status, 200);
//                done();
//             });
//       })

//       it('reset password', done => {
//          chai.request(server)
//             .patch('/api/v1/user/reset-password')
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                userId: '4dgh',
//                newPwd: 'a1b2c3d4e5'
//             })
//             .end((err, res) => {
//                assert.isObject(res.body);
//                assert.equal(res.status, 400);
//                done();
//             });
//       })
//    })


// })
