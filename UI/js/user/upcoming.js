if (!localStorage.getItem('token')) {
   window.location.href = '../index.html';
}

let user = JSON.parse(localStorage.getItem('user'));
Array.from(document.getElementsByClassName('profile-name')).forEach(element => {
    element.innerHTML = user.firstname;
});


fetch(`${localStorage.getItem('base_url')}/meetups/upcomingmeetups`, {
        headers: {
            'content-type': 'text/plain',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 200) {
            data.data.map(data=>{
                console.log(data);
               
                document.querySelector('#meetup-lists').innerHTML+=`
                <div class="single-meetup">
                    <div><img src=${data.coverimage} class="list-image" alt=""></div>
                    <div class="list-detailss">
                        <div> <a href="./meetup.html?id=${data.id}" class="question-header"> ${data.topic}</a></div>
                        <div></div>
                        <p><span class="bold"><i class="far fa-calendar"></i> Date:</span> <span class="brown">
                        ${new Date(data.happeningon).toDateString()}
                                </span> </p>
                        <p><span class="bold"> <i class="fa fa-map-marker-alt"></i> Location:</span><span class="brown">
                                ${data.location}</span> </p>
                        <div><span class="bold"> <i class="fa fa-question-circle"></i> Question:</span> ${data.qcount} <span class="brown">
                               </span>  <span class="bold"><br> <i class="fa fa-check"></i> RSVPS: </span><span
                                class="brown"> ${data.rsvpcount}</span> </div>
                    </div>
                </div>
                
                `

            })
        } 


    })
    .catch(error => console.log(error));
