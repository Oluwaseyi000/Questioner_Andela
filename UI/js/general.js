/* eslint-disable no-undef */
const overlay = document.getElementById('loader-overlay');
if (overlay) {
    window.addEventListener('load', () => {
        overlay.style.display = 'none';
        
    });
}



const terms = document.getElementById('terms-and-conditions');
if (terms) {
    terms.addEventListener('click', displayTermsAndConditions);

    function displayTermsAndConditions(e) {
        e.preventDefault();
        document.getElementById('terms-div').style.display = 'block';
    }
}


window.onload = function () {
    setTimeout(() => {
        var alert = document.getElementById('alert');
        if (alert) {
            alert.style.display = 'none';
        }
    }, 4000);
};


function displayAlert(message, alertId='msgAlert') {
    const alert = document.getElementById(alertId);
    alert.style.display = 'block';
    alert.innerHTML= message
    setTimeout(() => {
    
    }, 3000);
}



const drop = document.getElementById('dropdown');
if (drop) {
    drop.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('dropdownNav').style.display = 'block';

    });
}
/* Logout  */
const logout = document.querySelector('#logout');
if (logout) {
    addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = '../../index.html';
    });
}

function goBack() {
    window.history.back();
  }


  const userStatus = JSON.parse(localStorage.getItem('user'));
  
  
  if(userStatus.adminStatus) {
  
    document.getElementById('adminStatus').style.display = 'inline-block'
  }