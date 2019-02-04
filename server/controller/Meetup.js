import pool from '../model/db_connect';
import Meetups from '../model/Meetup';
import comments from '../model/Comment';
import Images from '../model/Images';
import Authenticate from '../middleware/authorize';


const confirmToken = Authenticate.confirmToken;

class Meetup {
  /**
    * Create A Meetup
    * @param {object} req
    * @param {object} res
    * @returns {object} meetup object
    */
  static createMeetup(req, res) {

    confirmToken(req, res);

    const tags = req.body.tags instanceof Array ? req.body.tags.join(';') : req.body.tags;

    const value = [
      req.body.topic,
      req.body.location,
      req.body.happeningOn,

      req.body.details,

      req.body.host,
      new Date(),
      new Date(),
      tags,
      req.body.coverImage,
    ];
    const text = 'INSERT INTO meetups(topic, location, happeningOn,  details, host, createdOn, updatedOn, tags, coverImage) VALUES($1, $2, $3,$4, $5, $6, $7,$8,$9) returning *';

    pool.query(text, value)
      .then(meetup =>
      // res.meetupId= meetup.rows[0].id;
        res.status(201).json({
          status: 201,
          data: meetup.rows[0],
        }),
      );
  }

  static getASpecificMeetupRecord(req, res) {
    /**
       * Get A Meetup
       * @param {object} req
       * @param {object} res
       * @returns {object} meetup object
       */
    confirmToken(req, res);
    // const text = `SELECT
    //                meetups.topic , questions.title
    //                 FROM meetups
    //                 LEFT JOIN questions  ON meetups.id=questions.meetupid
    //                 WHERE meetups.id=$1
    //                ` ;
    // const text = `SELECT
    //                meetups.*, questions.*, comment.* FROM questions, meetups,comments
    //                WHERE meetups.id=questions.meetupid and meetups.id=$1` ;

    //   const text = `SELECT * FROM meetups where id=$1` ;
    const text = `
    select meetups.*,
count (questions) as qcount, 
count (rsvps) as rsvpcount 
from meetups 
left join questions on questions.meetupid = meetups.id
left join rsvps on rsvps.userid=meetups.id 
where meetups.id=$1
group by(meetups.id) 
    `;
    const value = [req.params.meetupId];


    pool.query(text, value)

      .then((meetup) => {

        if (meetup.rows.length > 0) {
          return res.status(200).json({
            status: 200,
            data: meetup.rows,
          });

        }
        return res.status(404).json({
          status: 404,
          error: 'meetup not found',
        });

      })
      .catch(err => res.json(err));
  }


  static getAllMeetupsRecord(req, res, next) {
    /**
       * Get All Meetups
       * @param {object} req
       * @param {object} res
       * @returns {object} array of meetup objects
       */
    confirmToken(req, res);
   //  const text = 'select * from meetups';
    const text = `select meetups.*, count (questions) as qcount, count (rsvps) as rsvpcount from meetups left join questions on questions.meetupid = meetups.id left join rsvps on rsvps.userid=meetups.id group by(meetups.id) order by meetups.id `;
    pool.query(text)
      .then(meetup => res.status(200).json({
        status: 200,
        data: meetup.rows,
      }))
      .catch(err=>res.json({err}));
  }

  static upcomingMeetups(req, res) {
    /**
       * Get Upcoming Meetup
       * @param {object} req
       * @param {object} res
       * @returns {object} meetup object
       */
    confirmToken(req, res);
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

    confirmToken(req, res);

    const text = 'DELETE FROM meetups WHERE id=$1';
    const value = [req.params.meetupId];

    pool.query(text, value)
      .then(() => res.status(200).json({
        status: 200,
        data: ['meetup successfully deleted'],
      }))
      .catch(() => res.status(204).json({
        status: 2044,
        data: ['meetup cannot be deleted because if has has question dependencies'],
      }));
  }

  static addImage(req, res) {


    if (!req.body.images || !req.params.meetupId) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request, please include meetup meetupid Id and tags in your request as parameter',
      });
    } confirmToken(req, res);
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
    }
    else {
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
    } confirmToken(req, res);
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
    }
    else {
      return res.status(403).json({
        status: 403,
        error: 'only admin is authorize to add image',
      });
    }


  }


  // static addTag(req, res) {
  //    confirmToken(req, res);
  //    if (!req.body.tags || !req.params.meetupId) {
  //       return res.status(400).json({
  //          status: 400,
  //          error: 'Bad Request, please include meetup meetupid Id and tags in your request as parameter'
  //       })
  //    } else {

  //       const text = `SELECT id,topic FROM meetups WHERE id=$1`;
  //       const id = [req.body.meetupId];

  //       pool.query(text, id)
  //          .then(meetup => {
  //             return res.status(200).json({
  //                status: 200,
  //                data: {message: "tags added",
  //                userId: res.authData.userDetail.id,
  //                meetupId: req.body.meetupId,
  //                tags: req.body.tags,}
  //             })
  //          })
  //    }
  // }

}

export default Meetup;
