/* eslint-disable no-undef */
//document.addEventListener("DOMContentLoaded", function(event) {
/* redirect page back to home page if login token is not present */
// const token = JSON.parse(localStorage.getItem('token'))

/* Get current logged in user detail */

if (!localStorage.getItem('token')) {
   window.location.href = '../index.html';
}
const user = JSON.parse(localStorage.getItem('user'));

// get current page meetup Id
const meetupId = new URLSearchParams(window.location.search).get('id');

/* Populate current page with single meetup */
fetch(`${localStorage.getItem('base_url')}/meetups/${meetupId}`, {
  headers: {
    'content-type': 'text/plain',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => response.json())
  .then((meetup) => {
    if (meetup.status === 200) {
      // console.log(meetup.data);

      document.querySelector('#single-meetup-detail').innerHTML =
            `
                <div class="meetup-detail">
                            
                        <div>
                        <h1 class="h1">${meetup.data[0].topic}</h1>
                        <div></div>
                        <p ><span class="bold"><i class="far fa-calendar"></i> Date:</span>    <span class="brown"> ${meetup.data[0].happeningon}</span>    </p>
                        <p><span class="bold"> <i class="fa fa-map-marker-alt"></i> Location:</span><span class="brown"> ${meetup.data[0].location}Lagos</span> </p>
                        <p ><span class="bold"> <i class="fa fa-user"></i> Host: </span>    <span class="brown">${meetup.data[0].host}</span>    </p>
                        <div><span class="bold"> <i class="fa fa-question-circle"></i> Question:</span>  <span class="brown"> ${meetup.data[0].qcount} </span>  <span class="bold"><br> <i class="fa fa-check"></i> RSVPS: </span><span class="brown"> ${meetup.data[0].rsvpcount}</span> </div>
                        </div>
                    </div>
                                        <br>
                    
                    
                    </div>
                `
      // })
    } else {
      alert('wrong login credential');
      `Bearer ${localStorage.getItem('token')}`
    }


  })
  .catch(error => console.log(error));


/* Get All Questions of the current meetup */

fetch(`${localStorage.getItem('base_url')}/meetups/${meetupId}/questions`, {
  headers: {
    'content-type': 'text/plain',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => response.json())
  .then((question) => {
    if (question.status === 200) {

      console.log('question.data');
      question.data.map( question => {
        document.querySelector('#questions-list').innerHTML +=
               `
                        <div class="questionDiv "><span>Question by<a href="#"> ${question.firstname} </a>on ${question.createdon}</span>
                        <br> ${question.title}<br>
                        ${question.body}

                        <p>
                            <a href="#" id="upvote "onclick="upvote(${question.id}); return false"><i class="far fa-thumbs-up fa-2xs"></i></a> <span class="votecount fa-2xs">(${question.vote})</span> 

                            <a href="#" id="downvote"  onclick="downvote(${question.id}); return false" ><i class="far fa-thumbs-down fa-2xs"></i> </a></p>
                       <p>

                          
                           
                    </div>
                    <div id='comments-list-${question.id}'>
                        
                    </div>
                    <div>
                        <form name="commentForm${question.id}" id="cform${question.id}"  action="" class='postCommentForm'> 
                            <textarea id="commentbody${question.id}" name="post-comment-textarea" class="post-comment-textarea" placeholder="Comment on ${question.firstname} Question"></textarea>
                            <input type="button" onclick="return makeComment(${question.id}); return false" value="Comment" class="submitButton commentButton">
                        </form>   
                    </div>
                        `

        /* Get All comments of the current question */

        fetch(`${localStorage.getItem('base_url')}/questions/${question.id}/comments`, {
          headers: {
            'content-type': 'text/plain',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then(response => response.json())
          .then(comment => {

            comment.data.map(comment => {
              document.querySelector(
                `#comments-list-${comment.questionid}`).innerHTML +=
                           `
                        <div class="commentDiv"><span>Comment by <a href="#">${comment.firstname}</a> on ${comment.createdon}</span>
                        <br>
                        ${comment.body}
                    </div>

                        `
            },

            )


          })

      })
    }


  })
  .catch(error => console.log(error));



/* post question to current meetup */
document.querySelector('#postQuestionForm').addEventListener('submit', e => {

  e.preventDefault();
  let formData = new URLSearchParams(new FormData(e.target));
  // console.log(formData);
  formData.append('meetupId', meetupId),
  formData.append('userId', user.id)


  fetch(`${localStorage.getItem('base_url')}/questions`, {
    method: 'Post',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())

    .then(data => {
      if (data.status === 201) {
        document.getElementById('quesSuccessDiv').innerHTML = null;
        // data.message.forEach(error => {
        document.getElementById('quesSuccessDiv').innerHTML +=
               `
                <li>${data.message}</li>`

      } else {
        document.getElementById('questionError').innerHTML = null;
        data.error.forEach(error => {
          document.getElementById('questionError').innerHTML +=
                  `
                
                <li>${error}</li>
                `;
        });
      }
    })
    .catch(error => console.log(error));

})




document.querySelector('#rsvpForm').addEventListener('submit', e => {

  e.preventDefault();
  let formData = new URLSearchParams(new FormData(e.target));
  // console.log(formData);
  formData.append('meetupId', meetupId),
  formData.append('userId', user.id)


  fetch(`${localStorage.getItem('base_url')}/meetups/${meetupId}/rsvps`, {
    method: 'Post',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        document.getElementById('quesSuccessDiv').innerHTML = null;
        // data.message.forEach(error => {
        document.getElementById('quesSuccessDiv').innerHTML +=
               `
    <li>${data.message}</li>`

      } else {
        document.getElementById('questionError').innerHTML = null;
        data.error.forEach(error => {
          document.getElementById('questionError').innerHTML +=
                  `
    
    <li>${error}</li>
    `;
        });
      }
    })
    .catch(error => console.log(error));

})

function callmymethod(myVal) {
  //doing custom things with myVal
  const theV = document.getElementById(`commentbody${quesId}`.value);
  // console.log(theV);
  return false;
}

function commentSubmit(quesId) {
  // getElementById

  return false;
}

makeComment = (quesId) => {
  const commentBody = document.getElementById(`commentbody${quesId}`).value;
  // console.log(quesId);

  let formData = new URLSearchParams(new FormData);

  // console.log(formData);
  formData.append('questionId', quesId),
  formData.append('userId', 2)
  formData.append('comment', commentBody)

  fetch(`${localStorage.getItem('base_url')}/comments`, {
    method: 'post',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then(body => {
      console.log(body);
    })
    .catch(err => {
      console.log(err)
    })
  return false;
}


function upvote(quesId) {
  fetch(`${localStorage.getItem('base_url')}/questions/${quesId}/upvote`, {
    method: 'put',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then(body => {
      console.log(body);
    })
    .catch(err => {
      console.log(err)
    })
  return false;
}

function downvote(quesId) {
  console.log(quesId);
  fetch(`${localStorage.getItem('base_url')}/questions/${quesId}/downvote`, {
    mode: 'cors',
    method: 'put',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then(body => {
      console.log(body);
    })
    .catch(err => {
      console.log(err)
    })
  return false;
}






//}


//})