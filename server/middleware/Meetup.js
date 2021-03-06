/* eslint-disable consistent-return */
import Joi from 'joi';

class Meetup {
  static createMeetup(req, res, next) {
    const meetupSchema = Joi.object().keys({
      topic: Joi.string().required(),
      location: Joi.string().required(),
      happeningOn: Joi.required(),
    });
    const { error } = Joi.validate({
      topic: req.body.topic,
      location: req.body.location,
      happeningOn: req.body.happeningOn,
    }, meetupSchema, {
      abortEarly: false,
    });

    if (error) {
      const errorMsgs = error.details.map(() => error.message);
      return res.status(400).json({
        status: 400,
        error: errorMsgs,
      });
    }
    next();
  }

  static getASpecificMeetupRecord(req, res, next) {
    const meetupSchema = Joi.object().keys({
      meetupId: Joi.required(),
    });
    const { error } = Joi.validate({
      meetupId: req.params.meetupId,
    }, meetupSchema, {
      abortEarly: false,
    });

    if (error) {
      const errorMsgs = error.details.map(() => error.message);
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
    const { error } = Joi.validate({
      meetupId: req.params.meetupId,
    }, meetupSchema, {
      abortEarly: false,
    });

    if (error) {
      const errorMsgs = error.details.map(err => err.message);
      return res.status(400).json({
        status: 400,
        error: errorMsgs,
      });
    }
    next();
  }
}
export default Meetup;
