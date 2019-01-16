import Joi from 'Joi';
import { runInNewContext } from 'vm';
class userMiddleware {
     /**
    * Validate  user signup credentials
    * @param {object} req 
    * @param {object} res
    * @returns {object} errors response on fail or proceed to controller on success 
    */
   static userSignup(req, res) {
         const userSchema = Joi.object().keys({
            firstname: Joi.string().min(2).max(30).required(),
            lastname: Joi.string().min(2).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            //   email:Joi.string().required()
         });

         const {error, value} = Joi.validate({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
         }, userSchema, {
            abortEarly: false
         });

         if (error) {
            const errorMsgs = error.details.map(error => error.message)
            return res.status(400).json({
               status: 400,
               error: errorMsgs,
            })
         }
   }
}

export default userMiddleware;