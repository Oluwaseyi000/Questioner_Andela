
document.getElementById('currentTime').innerHTML = new Date().toLocaleDateString('en-GB', { hour: "numeric", 
minute: "numeric"});

let overlay = document.getElementById('loader-overlay')
window.addEventListener('load', function(){
overlay.style.display = 'none';
})

var terms= document.getElementById('terms-and-conditions');
if(terms){terms.addEventListener('click', displayTermsAndConditions);
function displayTermsAndConditions(e) {
    e.preventDefault();
    document.getElementById('terms-div').style.display='block'
}}

var deleteMeetup = document.getElementsByClassName('delete-meetup');

for (var i = 0; i < deleteMeetup.length; i++) {
    deleteMeetup[i].addEventListener('click',function() {
        setTimeout(function(){
            var alert = document.getElementById('alert');
            if(alert){alert.style.display='block';}
            }, 4000)   
    }, false);
}

var creatMeetup= document.getElementById('createMeetup');
if(creatMeetup){
    
    creatMeetup.addEventListener('click', creatMeetup)
}

function createMeetup(e) {
    console.log(creatMeetup);;
    location.replace("/")
    
}


 var submitButton = document.forms.namedItem('login');
 if(submitButton){submitButton.addEventListener('submit', processLoginForm)}

function processLoginForm(e) {
 e.preventDefault();
 var formData = new FormData( document.forms.namedItem('login'));
    if(formData.get('username')==='admin'){
        window.location.href = "./admin/meetups.html"
    }

    else if(formData.get('username')==='user'){
        window.location.href = "./user/index.html"
    }
    else{

    }
   
}

var signup= document.getElementById('signup');
if(signup){
    signup.addEventListener('click', processSignUpForm)
}
function processSignUpForm(){
    window.location.href = "./user/index.html"
}


window.onload = function () {setTimeout(function(){
    var alert = document.getElementById('alert');
    if(alert){alert.style.display='none';}
    }, 4000) 
}