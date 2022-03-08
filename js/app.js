// Hamburger Menu
function hambMenu() {
    let navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('nav-hidden');
}

// Fetching Projects
async function fetchProj() {
    let fetchUrl = "http://localhost:8000/projects";
    let projectImg = document.querySelectorAll('.img-project');
    for (let i = 0; i < projectImg.length; i++) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => projectImg[i].setAttribute('src', data[i].img))
            .catch(err => console.log(err));
    }

    let projectTitle = document.querySelectorAll('.project-title');
    for (let i = 0; i < projectTitle.length; i++) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => projectTitle[i].innerText = data[i].title)
            .catch(err => console.log(err));
    }

    let projectDesc = document.querySelectorAll('.project-description');
    for (let i = 0; i < projectDesc.length; i++) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => projectDesc[i].innerText = data[i].description)
            .catch(err => console.log(err));
    }

    let projectCont = document.querySelectorAll('.project-text');
    for (let i = 0; i < projectCont.length; i++) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => projectCont[i].innerText = data[i].content)
            .catch(err => console.log(err));
    }
}

fetchProj();

// Fetching related projects
async function fetchOtherProj() {
    let fetchUrl = "http://localhost:8000/other-projects";
    let projectImg = document.querySelectorAll('.img-project');
    for (let i = 0; i < projectImg.length; i++) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => projectImg[i].setAttribute('src', data[i].img))
            .catch(err => console.log(err));
    }

    let projectTitle = document.querySelectorAll('.other-project-title');
    for (let i = 0; i < projectTitle.length; i++) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => projectTitle[i].innerText = data[i].title)
            .catch(err => console.log(err));
    }

    let projectDesc = document.querySelectorAll('.other-project-description');
    for (let i = 0; i < projectDesc.length; i++) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => projectDesc[i].innerText = data[i].description)
            .catch(err => console.log(err));
    }

    let projectCont = document.querySelectorAll('.other-project-text');
    for (let i = 0; i < projectCont.length; i++) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => projectCont[i].innerText = data[i].content)
            .catch(err => console.log(err));
    }
}

fetchOtherProj();

// Contact Form Validation
let form = document.querySelector('.form-contact-form');

function saveData(event) {
    event.preventDefault(); // stop the form submitting

    let data = {
        fullname: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value,
        message: document.querySelector('#message').value
    }

    let divValidation = document.querySelector('.contact-validation');

    divValidation.innerHTML = ''; // reset previous validations

    if (!data.fullname) {
        divValidation.innerHTML += `<p class="validation-message">Name field must not be empty</p>`;
    }

    if (!data.email) {
        divValidation.innerHTML += `<p class="validation-message">Email field must not be empty</p>`;
    }

    if (data.phone.length < 9) {
        divValidation.innerHTML += `<p class="validation-message">Phone number field must contain at least 9 characters</p>`;
    }

    if (data.message.length < 50) {
        divValidation.innerHTML += `<p class="validation-message">Message must contain at least 50 characters</p>`;
    }

    else {

        // Saving Contact Form Data
        let fetchUrl = "http://localhost:8000/messages";

        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(results => results.json());
    }
}

form.addEventListener('submit', saveData);