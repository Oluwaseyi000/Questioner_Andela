/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class authorization {
  static verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      // eslint-disable-next-line prefer-destructuring
      req.token = bearer[1];
      jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            message: 'access forbiden, Unauthorize User. wrong token',
            err,
          });
        }
        res.authData = authData;
        req.authData = authData;
      });

      next();
    } else {
      res.status(403).json({
        error: '403',
        message: 'You do not have access to this page',

      });
    }
  }
}

export default authorization;
