
let userID = localStorage.getItem('userID');
let username = localStorage.getItem('username');



// document.getElementById('ask-button').addEventListener('click', function() {
//     var question = document.getElementById('question').value;
//     if (question.trim() !== '') {
//         var questionList = document.getElementById('question-list');
//         var newQuestion = document.createElement('li');
//         newQuestion.innerHTML = `
//             <h3>${question}</h3>
//             <button class="answer-button">Answer</button>
//         `;
//         questionList.prepend(newQuestion);
//         document.getElementById('question').value = '';
//     } else {
//         alert('Please enter a question');
//     }
// });

// document.getElementById('question-list').addEventListener('click', function(e) {
//     if (e.target && e.target.nodeName == 'BUTTON' && e.target.className == 'answer-button') {
//         var answer = prompt('Please enter your answer');
//         if (answer.trim() !== '') {
//             var answerParagraph = document.createElement('p');
//             answerParagraph.textContent = answer;
//             e.target.parentElement.appendChild(answerParagraph);
//             e.target.remove();
//         } else {
//             alert('Please enter an answer');
//         }
//     }
// });


var loginModal = document.getElementById("login-modal");
var signupModal = document.getElementById("signup-modal");

var overlay = document.getElementsByClassName('overlay')[0];
var btn = document.getElementById("login-button");

var closeButton = document.getElementsByClassName("close-button")[0];


btn.onclick = function () {
    loginModal.style.display = "flex";
    overlay.style.display = "block";
}

closeButton.onclick = function () {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
    overlay.style.display = "none";
}

overlay.onclick = function (event) {
    if (event.target == overlay) {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
        overlay.style.display = "none";
    }
}

var loginModalButton = document.getElementById("login-modal-button");

var signupModalButton = document.getElementById("signup-modal-button");

loginModalButton.addEventListener("click", () => {

    signupModal.style.display = "none";
    loginModal.style.display = "flex";

})

signupModalButton.addEventListener("click", () => {
    loginModal.style.display = "none";
    signupModal.style.display = "flex";
})


document.getElementById("signup-form").addEventListener("submit", (e) => {

    e.preventDefault();
    console.log("Sign-Up Start");

    let username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;
    let confirm_password = document.getElementById('confirm-password').value;
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    // data.append('confirm_password', confirm_password);
    if (username.trim() == '') {
        console.log("UserName Empty");
    }
    console.log(username, password, confirm_password);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE)

            if (xmlhttp.status == 409) {
                //user alredy exists
                console.log(xmlhttp.responseText);
            }

        if (xmlhttp.status == 200) {
            //account created logged in
            console.log(xmlhttp.responseText)
            localStorage.setItem('username', xmlhttp.responseText);

        }
    }
    xmlhttp.open('POST', '../server/signup.php', true);
    xmlhttp.send(data);
})

document.getElementById('login-form').addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("LOGIN-IN Start");

    const data = new FormData();
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    data.append('username', username);
    data.append('password', password);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 401) {
                //login falied
                console.log(xmlhttp.responseText);
            }
            if (xmlhttp.status == 200) {
                //login success

                var res = JSON.parse(xmlhttp.responseText);

                console.log(res);

                localStorage.setItem('userID', res.id);
                localStorage.setItem('username', res.username);
                loggedIN();

                loginModal.style.display = "none";
                signupModal.style.display = "none";
                overlay.style.display = "none";
                location.reload();

            }
        }
    }
    xmlhttp.open('POST', '../server/login.php', true);
    xmlhttp.send(data);

})


window.onload = () => {
    console.log(userID, username);

    if (userID && username)
        loggedIN();



    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            var data = JSON.parse(xmlhttp.responseText);

            data.forEach((value) => {
                console.log(value);

                var listItem = document.createElement('li');

                var title = document.createElement('h3');
                title.textContent = value.title

                var desc = document.createElement('h5');
                desc.textContent = value.description;

                var meta = document.createElement('h6');
                meta.textContent = `Posted By: ${value.username}  Last Updated: ${value.date_updated}`

                var answer = document.createElement('p');
                answer.textContent = value.text;

                var form = document.createElement('form');
                var textarea = document.createElement('textarea');
                var button = document.createElement('button');
                form.setAttribute('method', "POST")
                form.onsubmit = (e) => {
                    e.preventDefault();
                    var data = new FormData();

                    data.append('userID', userID);
                    data.append('questionID', value.questionID)
                    data.append('text', textarea.value);

                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = () => {
                        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                            if (xmlhttp.status == 200) {
                                window.alert('Answer Posted');
                                console.log(xmlhttp.responseText);
                            }
                        }
                    }
                    xmlhttp.open('POST', '../server/answer.php', true);
                    xmlhttp.send(data);
                    location.reload();
                }


                button.setAttribute('type', 'submit');
                button.textContent = "Post Answer.."
                form.appendChild(textarea);
                form.appendChild(button);
                listItem.appendChild(title);
                listItem.appendChild(desc);
                listItem.appendChild(meta);
                listItem.appendChild(answer);
                listItem.appendChild(form);
                document.getElementById("recent-question-list").appendChild(listItem);
            })
        }
    }
    xmlhttp.open('GET', '../server/recentQuestions.php', true);
    xmlhttp.send();
}



function loggedIN() {

    document.getElementById('login-button').style.display = 'none';
    document.getElementById('logout-button').style.display = 'inline';

    document.getElementById('logged-in').style.display = 'block';
    document.getElementById('not-logged-in').style.display = 'none';


}

document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userID');
    location.reload();
})


document.getElementById('post-question').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('question-title').value;
    const description = document.getElementById('question-description').value;
    var data = new FormData();

    data.append('userID', userID);
    data.append('title', title);
    data.append('description', description);

    console.log(title, description);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                window.alert('Question Posted');
                console.log(xmlhttp.responseText);
                location.reload();
            }
        }
    }
    xmlhttp.open('POST', '../server/question.php', true);
    xmlhttp.send(data);
})

// document.getElementById('recent-question-list')