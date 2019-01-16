import Joi from 'Joi';
class Meetup {

   static createMeetup(req, res, next) {
      [req.body.tags]
      
      const meetupSchema = Joi.object().keys({
         topic: Joi.string().min(5).required(),
         location: Joi.string().required(),
         happeningOn: Joi.required(),
      });

      const {
         error,
         value
      } = Joi.validate({
         topic: req.body.topic,
         location: req.body.location,
         happeningOn: req.body.happeningOn
      }, meetupSchema, {
         abortEarly: false
      });

      if (error) {
         const errorMsgs = error.details.map(error => error.message)
         return res.status(400).json({
            status: 400,
            error: errorMsgs,
         })
      }
      next();
   }
}
   export default Meetup;