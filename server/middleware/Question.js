/* eslint-disable consistent-return */
import Joi from 'joi';

class Question {
  static createQuestion(req, res, next) {
    const questionSchema = Joi.object().keys({
      meetupId: Joi.required(),
      title: Joi.string().required(),
      body: Joi.string().required(),

    });
    const {
      error,
    } = Joi.validate({
      meetupId: req.body.meetupId,
      title: req.body.title,
      body: req.body.body,
    }, questionSchema, {
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

export default Question;
