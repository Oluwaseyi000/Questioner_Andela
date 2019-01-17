import jwt from 'jsonwebtoken';
class authorization {

   static verifyToken(req, res, next) {

      const bearerHeader = req.headers['authorization']
      if (typeof bearerHeader !== 'undefined') {
         const bearer = bearerHeader.split(' ');
         req.token = bearer[1];
         next();
      } else {
         res.status(403).json({
            error: '403',
            message: 'You do not have access to this page'

         })
      }
   }

   static confirmToken(req, res, secretkey = 'secretkey', ) {
      return ;
      jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
               return res.status(403).json({
                  status: 403,
                  message: 'access forbiden, wrong token',
                  err,
               })
            }else{return ; }
            
         })
      }
   }

   export default authorization;