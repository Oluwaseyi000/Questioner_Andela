/* eslint-disable consistent-return */
import pool from '../model/db_connect';

class Meetup {
  /**
    * Create A Meetup
    * @param {object} req
    * @param {object} res
    * @returns {object} meetup object
    */

  static createMeetup(req, res) {
    if (res.authData.userDetail.isadmin) {
      const value = [
        req.body.topic,
        req.body.location,
        req.body.happeningOn,
        req.body.details,
        req.body.host,
        new Date(),
        new Date(),
      ];
      const text = 'INSERT INTO meetups(topic, location, happeningOn,  details, host, createdOn, updatedOn) VALUES($1, $2, $3,$4, $5, $6, $7) returning id,topic, location, happeningOn';

      pool.query(text, value)
        .then(meetup => (res.status(200).json({
          status: 200,
          data: meetup.rows[0],
        })
        ));
    } else {
      return res.status(403).json({
        status: 403,
        error: 'only admin is authorize to add meetup',
      });
    }
  }

  static getASpecificMeetupRecord(req, res) {
    /**
       * Get A Meetup
       * @param {object} req
       * @param {object} res
       * @returns {object} meetup object
       */


    const text = 'SELECT * FROM meetups WHERE id=$1';
    const value = [req.params.meetupId];

    pool.query(text, value)
      .then((meetup) => {
        if (meetup.rows.length > 0) {
          return res.status(200).json({
            status: 200,
            data: [meetup.rows[0]],
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'meetup not found',
        });
      });
  }


  static getAllMeetupsRecord(res) {
    /**
       * Get All Meetups
       * @param {object} req
       * @param {object} res
       * @returns {object} array of meetup objects
       */

    const text = 'SELECT * FROM meetups';

    pool.query(text)
      .then(meetup => res.status(200).json({
        status: 200,
        data: meetup.rows,
      }));
  }

  static upcomingMeetups(res) {
    /**
       * Get Upcoming Meetup
       * @param {object} req
       * @param {object} res
       * @returns {object} meetup object
       */

    const text = 'SELECT * FROM meetups WHERE happeningOn>=$1';
    const value = [new Date()];

    pool.query(text, value)
      .then(meetup => res.status(200).json({
        status: 200,
        data: meetup.rows,
      }));
  }

  static deleteMeetup(req, res) {
    /**
       * Delete A Meetup
       * @param {object} req
       * @param {object} res
       * @returns {object} return status code 204
       */

    if (res.authData.userDetail.isadmin) {
      const text = 'DELETE FROM meetups WHERE id=$1';
      const value = [req.params.meetupId];

      pool.query(text, value)
        .then(() => res.status(200).json({
          status: 200,
          data: ['meetup successfully deleted'],
        }));
    } else {
      return res.status(403).json({
        status: 403,
        error: 'only admin is authorize to add tags',
      });
    }
  }


  /**
    * Create A Rsvp
    * @param {object} req
    * @param {object} res
    * @returns {object} rsvp object
    */
  static createRsvps(req, res) {
    if (!req.body.status || !req.params.meetupId) {
      return res.status(400).json({
        status: 400,
        error: 'Bad request error, missing required data. Note: status is require',
      });
    }
    const text = 'INSERT INTO rsvps(userId, meetupId, response) VALUES($1, $2, $3) RETURNING response';

    const value = [
      res.authData.userDetail.id,
      req.params.meetupId,
      req.body.status,
    ];
    pool.query(text, value)
      .catch(() => res.status(409).json({
        status: 409,
        error2: 'RSVP already exist for user',
      }));


    const text3 = 'SELECT id, topic FROM meetups WHERE id=$1';
    const value3 = [req.params.meetupId];

    pool.query(text3, value3)
      .then(meetup => res.status(201).json({
        status: 201,
        message: 'RSVP successfully created',
        data: [{
          meetup: meetup.rows[0].id,
          topic: meetup.rows[0].topic,
          status: req.body.status,
        }],
      }))
      .catch(() => res.status(404).json({
        error: 'meetup  do not exit',
      }));
  }

  static addImage(req, res) {
    if (!req.body.images || !req.params.meetupId) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request, please include meetup meetupid Id and tags in your request as parameter',
      });
    }
    if (res.authData.userDetail.isadmin) {
      const images = req.body.images instanceof Array ? req.body.images.join(';') : req.body.images;

      const text = 'SELECT id,topic FROM meetups WHERE id=$1';
      const id = [req.params.meetupId];

      pool.query(text, id)
        .then((meetup) => {
          const text2 = 'INSERT INTO images(meetupid, images) VALUES($1, $2)';
          const value2 = [req.params.meetupId, images];
          pool.query(text2, value2);
          return res.status(201).json({
            status: 201,
            data: {
              meetup: req.params.meetupId,
              topic: meetup.topic,
              images: req.body.images,
            },
          });
        });
    } else {
      return res.status(403).json({
        status: 403,
        error: 'only admin is authorize to add image',
      });
    }
  }


  static addTag(req, res) {
    if (!req.body.tags || !req.params.meetupId) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request, please include meetup meetupid Id and tags in your request as parameter',
      });
    }
    if (res.authData.userDetail.isadmin) {
      const tags = req.body.tags instanceof Array ? req.body.tags.join(';') : req.body.tags;

      const text = 'SELECT id,topic FROM meetups WHERE id=$1';
      const id = [req.params.meetupId];

      pool.query(text, id)
        .then((meetup) => {
          const text2 = 'INSERT INTO tags(meetupid, tags) VALUES($1, $2)';
          const value2 = [req.params.meetupId, tags];
          pool.query(text2, value2);
          return res.status(201).json({
            status: 201,
            data: {
              meetup: req.params.meetupId,
              topic: meetup.topic,
              images: req.body.tags,
            },
          });
        });
    } else {
      return res.status(403).json({
        status: 403,
        error: 'only admin is authorize to add tags',
      });
    }
  }
}

export default Meetup;
