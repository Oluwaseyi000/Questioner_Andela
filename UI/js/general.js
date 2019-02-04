let overlay = document.getElementById('loader-overlay');
if(overlay) {
  window.addEventListener('load', function() {
    overlay.style.display = 'none';
  })
}


let terms= document.getElementById('terms-and-conditions');
if(terms) {terms.addEventListener('click', displayTermsAndConditions);
  function displayTermsAndConditions(e) {
    e.preventDefault();
    document.getElementById('terms-div').style.display='block'
  }}

let deleteMeetup = document.getElementsByClassName('delete-meetup');

for (let i = 0; i < deleteMeetup.length; i++) {
  deleteMeetup[i].addEventListener('click',function() {
    setTimeout(function() {
      let alert = document.getElementById('alert');
      if(alert) {alert.style.display='block';}
    }, 4000)   
  }, false);
}

let creatMeetup= document.getElementById('createMeetup');
if(creatMeetup) {
    
  creatMeetup.addEventListener('click', creatMeetup)
}

function createMeetup(e) {
   
  location.replace("/")
    
}


let submitButton = document.forms.namedItem('login');
if(submitButton) {submitButton.addEventListener('submit', processLoginForm)}

function processLoginForm(e) {
  e.preventDefault();
  let formData = new FormData( document.forms.namedItem('login'));
  if(formData.get('username')==='admin') {
    window.location.href = "./admin/meetups.html"
  }

  else if(formData.get('username')==='user') {
    window.location.href = "./user/index.html"
  }
  else{

  }
   
}

// var signup= document.getElementById('signup');
// if(signup){
//     signup.addEventListener('click', processSignUpForm)
// }
// function processSignUpForm(){
//     window.location.href = "./user/index.html"
// }


window.onload = function () {setTimeout(function() {
  let alert = document.getElementById('alert');
  if(alert) {alert.style.display='none';}
}, 4000) 
}

let drop = document.getElementById('dropdown');
if(drop) {
  drop.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('dropdownNav').style.display="block"
        
  })
}

const goToSignup = document.getElementById('goToSignup');
if(goToSignup) {
  goToSignup.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signup').style.display="block"
    document.getElementById('signin').style.display="none";
        
  })
}


const goToSignin = document.getElementById('goToSignin');
if(goToSignin) {
  goToSignin.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signup').style.display="none";
    document.getElementById('signin').style.display="block"  
  })
}