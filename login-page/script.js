// Registration form submission
document.querySelector('.signupbtn').addEventListener('click', () => {
    const name = document.querySelector('.namefield input').value;
    const email = document.querySelector('.input-field input[type="email"]').value;
    const password = document.querySelector('.input-field input[type="password"]').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
    })
    .catch(error => {
        console.error('Error registering user:', error);
    });
});

// Login form submission
document.querySelector('.signinbtn').addEventListener('click', () => {
    const email = document.querySelector('.input-field input[type="email"]').value;
    const password = document.querySelector('.input-field input[type="password"]').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
    })
    .catch(error => {
        console.error('Error logging in user:', error);
    });
});






let signUpBtn = document.querySelector('.signupbtn')
let signInBtn = document.querySelector('.signinbtn')
let nameField = document.querySelector('.namefield')
let title = document.querySelector('.title')
let underline = document.querySelector('.underline')
let text = document.querySelector('.text')

signInBtn.addEventListener("click" ,()=>{
    nameField.style.maxHeight = '0';
    title.innerHTML = 'Sign In';
    text.innerHTML = 'Forgot Password';
    signUpBtn.classList.add('disable');
    signInBtn.classList.remove('disable');
    underline.style.transform = 'translateX(35px)';
});

signUpBtn.addEventListener("click" ,()=>{
    nameField.style.maxHeight = '60px';
    title.innerHTML = 'Sign Up';
    text.innerHTML = 'Password Suggestion';
    signUpBtn.classList.remove('disable');
    signInBtn.classList.add('disable');
    underline.style.transform = 'translateX(0)';
});