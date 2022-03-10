// Hamburger Menu
function hambMenu() {
    let navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('nav-hidden');
}

// hambMenu() is called as an 'onclick' event (index.html, line 16)


// Fetching Projects
let fetchUrlProj = "http://localhost:8000/projects";

let projectImg = document.querySelectorAll('.img-project'); // extra data added to db.json
let projectTitle = document.querySelectorAll('.project-title');
let projectDesc = document.querySelectorAll('.project-description');


async function fetchProj() {
    await fetch(fetchUrlProj)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                projectImg[i].setAttribute('src', data[i].img); // extra data added to db.json
                projectTitle[i].innerText = data[i].title;
                projectDesc[i].innerText = data[i].description;
            }
        })
        .catch(err => console.log(err));
}

fetchProj();


// --------- MAKING PROJECT PAGE DYNAMIC ---------
let projWrap = document.querySelectorAll('.project-wrap');
let projWrapOther = document.querySelectorAll('.project-wrap-other');
console.log(projWrapOther);

async function addEndpoint() {
    for (let i = 0; i < projWrap.length; i++) {
        projWrap[i].setAttribute('href', 'projects.html?' + (i + 1)); // adding '?...'
        // projWrapOther[i].setAttribute('href', 'projects.html?' + (i + 1)); // adding '?...'
    }
}

addEndpoint();

let projNum = window.location.search.split('?')[1]; // id number is printed
// console.log(projNum); // id number is printed

let articleTitle = document.querySelector('.article-title');
let articleCategory = document.querySelector('.article-category');
let articleImg = document.querySelector('.article-img');
let projectText = document.querySelector('.project-text');

async function dynamicProjectPage() {
    await fetch(fetchUrlProj)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (projNum == data[i].id) {
                    articleTitle.innerText = data[i].title;
                    articleCategory.innerText = data[i].description;
                    articleImg.setAttribute('src', data[i].img);
                    projectText.innerText = data[i].content;
                }
            }
        })
        .catch(err => console.log(err));
}

dynamicProjectPage();

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
    await fetch(fetchUrlForm, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(results => results.json());

    divValidation.innerHTML += `<p class="validation right">Your contact details were sent succesfully</p>`;
    return;
}

form.addEventListener('submit', saveData);