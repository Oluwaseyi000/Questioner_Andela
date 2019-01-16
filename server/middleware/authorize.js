class authorization {

   static verifyToken(req, res, next) {

      //get the auth header value
      const bearerHeader = req.headers['authorization']

      //if if bearer is undefiend
      if (typeof bearerHeader !== 'undefined') {
         const bearer = bearerHeader.split(' ');

         //get token from array
         const bearerToken = bearer[1];
         //set the token
         req.token = bearerToken;
         // res.status(403).json({
         //   res:req.token
         // })
         next();
      } else {
         res.status(403).json({
            error: 'unauthorize fooooorbidden'
         })
      }
   }
}

export default authorization;