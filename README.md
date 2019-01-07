# Questioner-API
API for Crowd-source questions for a meetup.



Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

[![Build Status](https://travis-ci.org/Oluwaseyi000/API_Andela_Questioner.svg?branch=develop)](https://travis-ci.org/Oluwaseyi000/API_Andela_Questioner)


[![Coverage Status](https://coveralls.io/repos/github/Oluwaseyi000/API_Andela_Questioner/badge.svg?branch=develop)](https://coveralls.io/github/Oluwaseyi000/API_Andela_Questioner?branch=develop)

<a href="https://codeclimate.com/github/Oluwaseyi000/Questioner_Andela/maintainability"><img src="https://api.codeclimate.com/v1/badges/6421d81752471fd6e8b6/maintainability" /></a>

<a href="https://codeclimate.com/github/Oluwaseyi000/Questioner_Andela/test_coverage"><img src="https://api.codeclimate.com/v1/badges/6421d81752471fd6e8b6/test_coverage" /></a>

<h3>Quick API Documentation</h3>
<table> 
   <tr>
      <td>s/n</td>
      <td>Method</td>
      <td>Endpoint</td>
      <td>Requested Field</td>
      <td>Optional Field</td>
      <td>Description</td>
   </tr>
<tr>
   <td>1</td>
      <td>GET</td>
      <td>https://seyiproject.herokuapp.com/api/v1/meetups</td>
      <td>Non</td>
      <td>Non</td>
      <td>On success, it returns all the available meetup records, and return error message on failure</td>
   </tr>
    <td>2</td>
      <td>POST</td>
      <td>https://seyiproject.herokuapp.com/api/v1/meetups</td>
      <td>topic , location, happeningOn</td>
      <td>details, host, coverimage, tags</td>
      <td>On success, it allow user to create a new meetup record, and return error message on failure</td>
   </tr>
   </tr>
    <td>2</td>
      <td>POST</td>
      <td>https://seyiproject.herokuapp.com/api/v1/meetups</td>
      <td>topic , location, happeningOn</td>
      <td>details, host, coverimage, tags</td>
      <td>On success, it allow user to create a new meetup record, and return error message on failure</td>
   </tr>
</table>
