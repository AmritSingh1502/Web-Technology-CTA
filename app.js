document.getElementById('ask-button').addEventListener('click', function() {
    var question = document.getElementById('question').value;
    if (question.trim() !== '') {
        var questionList = document.getElementById('question-list');
        var newQuestion = document.createElement('li');
        newQuestion.innerHTML = `
            <h3>${question}</h3>
            <button class="answer-button">Answer</button>
        `;
        questionList.prepend(newQuestion);
        document.getElementById('question').value = '';
    } else {
        alert('Please enter a question');
    }
});

document.getElementById('question-list').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName == 'BUTTON' && e.target.className == 'answer-button') {
        var answer = prompt('Please enter your answer');
        if (answer.trim() !== '') {
            var answerParagraph = document.createElement('p');
            answerParagraph.textContent = answer;
            e.target.parentElement.appendChild(answerParagraph);
            e.target.remove();
        } else {
            alert('Please enter an answer');
        }
    }
});


var modal = document.getElementById("login-modal");

var overlay = document.getElementsByClassName('overlay')[0];
var btn = document.getElementById("login-button");

var span = document.getElementById("close-button");


btn.onclick = function () {
    modal.style.display = "flex";
    overlay.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
    overlay.style.display = "none";
}

overlay.onclick = function (event) {
    if (event.target == overlay) {
        modal.style.display = "none";
        overlay.style.display = "none";
    }
}