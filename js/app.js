// Hamburger Menu
function hambMenu() {
    let navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('nav-hidden');
}

// Fetching Projects
let fetchUrlProj = "http://localhost:8000/projects";
let fetchUrlOtherProj = "http://localhost:8000/other-projects";

async function fetchProj() {
    let projectImg = document.querySelectorAll('.img-project');
    for (let i = 0; i < projectImg.length; i++) {
        fetch(fetchUrlProj)
            .then(response => response.json())
            .then(data => projectImg[i].setAttribute('src', data[i].img))
            .catch(err => console.log(err));
    }

    let projectTitle = document.querySelectorAll('.project-title');
    for (let i = 0; i < projectTitle.length; i++) {
        fetch(fetchUrlProj)
            .then(response => response.json())
            .then(data => projectTitle[i].innerText = data[i].title)
            .catch(err => console.log(err));
    }

    let projectDesc = document.querySelectorAll('.project-description');
    for (let i = 0; i < projectDesc.length; i++) {
        fetch(fetchUrlProj)
            .then(response => response.json())
            .then(data => projectDesc[i].innerText = data[i].description)
            .catch(err => console.log(err));
    }

    let projectCont = document.querySelectorAll('.project-text');
    for (let i = 0; i < projectCont.length; i++) {
        fetch(fetchUrlProj)
            .then(response => response.json())
            .then(data => projectCont[i].innerText = data[i].content)
            .catch(err => console.log(err));
    }
}

fetchProj();

// Fetching related projects
async function fetchOtherProj() {
    let projectImg = document.querySelectorAll('.img-project');
    for (let i = 0; i < projectImg.length; i++) {
        fetch(fetchUrlOtherProj)
            .then(response => response.json())
            .then(data => projectImg[i].setAttribute('src', data[i].img))
            .catch(err => console.log(err));
    }

    let projectTitle = document.querySelectorAll('.other-project-title');
    for (let i = 0; i < projectTitle.length; i++) {
        fetch(fetchUrlOtherProj)
            .then(response => response.json())
            .then(data => projectTitle[i].innerText = data[i].title)
            .catch(err => console.log(err));
    }

    let projectDesc = document.querySelectorAll('.other-project-description');
    for (let i = 0; i < projectDesc.length; i++) {
        fetch(fetchUrlOtherProj)
            .then(response => response.json())
            .then(data => projectDesc[i].innerText = data[i].description)
            .catch(err => console.log(err));
    }

    let projectCont = document.querySelectorAll('.other-project-text');
    for (let i = 0; i < projectCont.length; i++) {
        fetch(fetchUrlOtherProj)
            .then(response => response.json())
            .then(data => projectCont[i].innerText = data[i].content)
            .catch(err => console.log(err));
    }
}

fetchOtherProj();

// Contact Form Validation
let form = document.querySelector('.form-contact-form');
let fetchUrlForm = "http://localhost:8000/messages";
let validation = true;

async function saveData(event) {
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
        divValidation.innerHTML += `<p class="validation wrong">Name field must not be empty</p>`;
        validation = false;
    }

    if (!data.email) {
        divValidation.innerHTML += `<p class="validation wrong">Email field must not be empty</p>`;
        validation = false;
    }

    if (data.phone.length < 9) {
        divValidation.innerHTML += `<p class="validation wrong">Phone number field must contain at least 9 characters</p>`;
        validation = false;
    }

    if (data.message.length < 30) {
        divValidation.innerHTML += `<p class="validation wrong">Message must contain at least 30 characters</p>`;
        validation = false;
    }

    if (!validation) return; // no guardar los datos

    // Saving Contact Form Data
    fetch(fetchUrlForm, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(results => results.json());


    divValidation.innerHTML += `<p class="validation right">Your contact details were sent succesfully</p>`;
    return true;
}

form.addEventListener('submit', saveData);

// Fetching Projects

function projPage() {
    let projectWrap = document.querySelectorAll('.project-wrap');
    for (let i = 0; i < projectWrap.length; i++) {
        fetchProjPage = `http://localhost:8000/projects/{i}`;
        fetch(fetchProjPage)
            .then(response => response.json())
            .then(data => projectWrap[i].setAttribute('href', data[i].id))
            .catch(err => console.log(err));
    }
}

addEventListener('onclick', projPage);