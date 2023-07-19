const hidePassword = document.querySelector('.bi-eye');
const hidePassword2 = document.querySelector('#eye');
const hidePassword3 = document.querySelector('#eyetwo');
const input = document.querySelector('#senha')
const input2 = document.querySelector('#newsenha')
const input3 = document.querySelector('#confirmnewsenha')


hidePassword.addEventListener('click', togglePass);

function togglePass(){

    if(input.type == 'password') {
        input.type = 'text'
        hidePassword.classList.replace('bi-eye', 'bi-eye-slash')
    }
    else{
        input.type = 'password'
        hidePassword.classList.replace('bi-eye-slash', 'bi-eye')
    }

}

hidePassword2.addEventListener('click', togglePass2);

function togglePass2(){

    if(input2.type == 'password') {
        input2.type = 'text'
        hidePassword2.classList.replace('bi-eye', 'bi-eye-slash')
    }
    else{
        input2.type = 'password'
        hidePassword2.classList.replace('bi-eye-slash', 'bi-eye')
    }

}

hidePassword3.addEventListener('click', togglePass3);

function togglePass3(){

    if(input3.type == 'password') {
        input3.type = 'text'
        hidePassword3.classList.replace('bi-eye', 'bi-eye-slash')
    }
    else{
        input3.type = 'password'
        hidePassword3.classList.replace('bi-eye-slash', 'bi-eye')
    }

}



