
document.getElementById('currentTime').innerHTML = new Date().toLocaleDateString('en-GB', { hour: "numeric", 
minute: "numeric"});

let overlay = document.getElementById('loader-overlay')
window.addEventListener('load', function(){
overlay
.style.display = 'none';
})