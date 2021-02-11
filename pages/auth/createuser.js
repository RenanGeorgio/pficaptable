//import { pool } from '../../database.js';

const FormDisplay = document.getElementById('Form-display');
const usernameform = document.getElementById('username-form');
const fullnameform = document.getElementById('fullname-form');
const cpfform = document.getElementById('cpf-form');
const emailform = document.getElementById('email-form');
const pswform = document.getElementById('psw-form');
const psw2form = document.getElementById('psw2-form');

//pool.connect()

FormDisplay.addEventListener('submit', (e) => {
	e.preventDefault();
	
	checkInputs()
	
});

function checkInputs() {
	// trim para remover espaços em branco 
    const usernameValue = usernameform.value.trim();
    const fullnameValue = fullnameform.value.trim();
    const cpfValue = cpfform.value.trim();
    const emailValue = emailform.value.trim();
    const pswValue = pswform.value.trim();
    const psw2Value = psw2form.value.trim();

    //checagem para nome de usuario
	if(usernameValue === '') {
		setErrorFor(usernameform, 'nome do usuario não pode estar em branco');
	} else {
		setSuccessFor(usernameform);
    }
    
    //checagem para nome de nome completo
	if(fullnameValue === '') {
		setErrorFor(fullnameform, 'nome completo não pode estar em branco');
	} else {
		setSuccessFor(fullnameform);
    }
    
    //checagem de cpf
	if(cpfValue === '') {
		setErrorFor(cpfform, 'cpf não pode estar em branco');
	} else {
		setSuccessFor(cpfform);
    }
    
    //checagem para email
	if(emailValue === '') {
		setErrorFor(emailform, 'Email não pode estar em branco');
	} else if (!isEmail(emailValue)) {
		setErrorFor(emailform, 'Email invalido');
	} else {
		setSuccessFor(emailform);
	}
    
    //checagem de senha
	if(pswValue === '') {
		setErrorFor(pswform, 'Senha não pode estar em branco');
	} else {
		setSuccessFor(pswform);
	}
    
    //confirmação da senha
	if(psw2Value === '') {
		setErrorFor(psw2form, 'Senha não pode estar em branco');
	} else if(pswValue !== psw2Value) {
		setErrorFor(psw2form, 'As senhas são diferentes');
	} else{
		setSuccessFor(psw2form);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function cpfFormat(valor) {
    var v = valor.value;
   
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
        valor.value = v.substring(0, v.length-1);
        return;
    }
   
    valor.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) valor.value += ".";
    if (v.length == 11) valor.value += "-";
};
