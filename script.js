const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const closeBtn = document.querySelector('.close');
const popup = document.querySelector('.popup')


const showError = (input, msg) =>{
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-txt');

    formBox.classList.add('error');
    errorMsg.textContent = msg;
}

const resetError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
}


const checkForm = input =>{
    input.forEach(el =>{
        if (el.value === ''){
            showError(el, el.placeholder)
        } else {
            resetError(el)
        }
    });
}

const checkLength = (input, min) =>{
    if(input.value.length < min){
        showError(input, `${input.previousElementSibling.innerText.replace(/:/,"")} musi składać się z min. ${min} znaków`);
    }
}

const checkPassword = (password, password2) =>{
    if(password.value !== password2.value){
        showError(password2, 'Hasła nie są takie same');
    }
}

const validateEmail = email =>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(email.value)) {
        resetError(email)
    } else {
        showError(email, 'Błędny adres e-mail')
    }
}

const checkError = () =>{
    const allFormBox = document.querySelectorAll('.form-box');
    let errorCount = 0;

    allFormBox.forEach(input =>{
        if(input.classList.contains('error')){
            errorCount++;
        }
    })
    
    if(errorCount === 0){
        popup.classList.add('show-popup')
    }
    
}


sendBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    checkForm([username, password, password2, email])
    checkLength(username, 3);
    checkLength(password, 8);
    checkPassword(password, password2);
    validateEmail(email);
    checkError();
})

clearBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    [username, password, password2, email].forEach(el =>{
        el.value = '';
        resetError(el);
    })

})