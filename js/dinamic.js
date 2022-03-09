// --------- MAKING PROJECT PAGE DYNAMIC ---------
let projNum = window.location.search[1]; // '?...' is pritnted
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