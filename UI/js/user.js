var button = document.getElementById('askQusestionButton')

if (button) {
    addEventListener('click', function displayQuestionForm() {
        document.getElementById('postQuestionForm').style.display = "block";
        console.log('qquestion butotn cliked');
    })
}