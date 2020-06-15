# Questioner
A Crowd-source questions for a meetup.
<b><a href="https://oluwaseyi000.github.io/Questioner_Andela/"> Click to view </a></b>


Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

[![Build Status](https://travis-ci.com/Oluwaseyi000/Questioner_Andela.svg?branch=develop)](https://travis-ci.com/Oluwaseyi000/Questioner_Andela)

[![Coverage Status](https://coveralls.io/repos/github/Oluwaseyi000/Questioner_Andela/badge.svg?branch=develop)](https://coveralls.io/github/Oluwaseyi000/Questioner_Andela?branch=develop)


<a href="https://codeclimate.com/github/Oluwaseyi000/Questioner_Andela/maintainability"><img src="https://api.codeclimate.com/v1/badges/6421d81752471fd6e8b6/maintainability" /></a>


<b>Endpoint</b>
<ul>
<li>POST /auth/signup -register new user</li>
<li>POST /auth/login  -login user</li>
<li>POST /meetups -create meetup</li>
<li>GET /meetups/ -get all meetup</li>
<li>GET /meetups/:meetup-id   -get a meetup</li>
<li>DELETE /meetups/:meetup-id --delete a meetup</li>
<li>GET /meetups/upcoming/  -get upcoming meetup</li>
<li>POST /questions --create question</li>
<li>PATCH /questions/:question-id/upvote --upvote a question</li>
<li>PATCH /questions/:question-id/downvote --downvote a question</li>
<li>POST /meetups/:meetup-id/rsvps  --rsvp a meetup</li>
<li>POST /comments/ --ccomment on a question</li>
<li>DELETE /meetups/ --delete meetup<meetup-id></li>
<li>POST /meetups/:meetup-id/tags> --add tags to meetup</li>

<li>POST /meetups/:meetup-id/images
--Add images to a meetup.</li>


</ul>
