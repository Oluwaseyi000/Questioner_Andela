/* eslint-disable consistent-return */
import Joi from 'joi';

class Meetup {
  static createMeetup(req, res, next) {
    const meetupSchema = Joi.object().keys({
      topic: Joi.string().min(5).required(),
      location: Joi.string().required(),
      happeningOn: Joi.required(),
    });
<<<<<<< HEAD
    const { error } = Joi.validate({
=======
    const {
      error,
      value,
    } = Joi.validate({
>>>>>>> consume API
      topic: req.body.topic,
      location: req.body.location,
      happeningOn: req.body.happeningOn,
    }, meetupSchema, {
      abortEarly: false,
    });

    if (error) {
<<<<<<< HEAD
      const errorMsgs = error.details.map(() => error.message);
=======
      const errorMsgs = error.details.map(error => error.message);
>>>>>>> consume API
      return res.status(400).json({
        status: 400,
        error: errorMsgs,
      });
    }
<<<<<<< HEAD
    next();
=======
    return next();
>>>>>>> consume API
  }

  static getASpecificMeetupRecord(req, res, next) {
    const meetupSchema = Joi.object().keys({
      meetupId: Joi.required(),
    });
<<<<<<< HEAD
    const { error } = Joi.validate({
=======
    const {
      error,
      value,
    } = Joi.validate({
>>>>>>> consume API
      meetupId: req.params.meetupId,
    }, meetupSchema, {
      abortEarly: false,
    });

    if (error) {
<<<<<<< HEAD
      const errorMsgs = error.details.map(() => error.message);
=======
      const errorMsgs = error.details.map(error => error.message);
>>>>>>> consume API
      return res.status(400).json({
        status: 400,
        error: errorMsgs,
      });
    }
    next();
  }

  static deleteMeetup(req, res, next) {
    const meetupSchema = Joi.object().keys({
      meetupId: Joi.required(),
    });
<<<<<<< HEAD
    const { error } = Joi.validate({
=======
    const {
      error,
      value,
    } = Joi.validate({
>>>>>>> consume API
      meetupId: req.params.meetupId,
    }, meetupSchema, {
      abortEarly: false,
    });

    if (error) {
<<<<<<< HEAD
      const errorMsgs = error.details.map(err => err.message);
=======
      const errorMsgs = error.details.map(error => error.message);
>>>>>>> consume API
      return res.status(400).json({
        status: 400,
        error: errorMsgs,
      });
    }
    next();
  }
}
export default Meetup;
