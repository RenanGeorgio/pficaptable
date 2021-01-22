const FormDisplay = document.getElementById('Form-display');
const usernameform = document.getElementById('username-form');
const fullnameform = document.getElementById('fullname-form');
const cpfform = document.getElementById('cpf-form');
const cepform = document.getElementById('cep-form');
const streetform = document.getElementById('street-form');
const numberform = document.getElementById('number-form');
const cityform = document.getElementById('city-form');
const stateform = document.getElementById('state-form');
const countryform = document.getElementById('country-form');
const celform = document.getElementById('cel-form');
const emailform = document.getElementById('email-form');
const pswform = document.getElementById('psw-form');
const psw2form = document.getElementById('psw2-form');

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('street-form').value=("");
    document.getElementById('city-form').value=("");
    document.getElementById('state-form').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('street-form').value=(conteudo.logradouro);
        document.getElementById('city-form').value=(conteudo.localidade);
        document.getElementById('state-form').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('street-form').value="...";
            document.getElementById('city-form').value="...";
            document.getElementById('state-form').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};


FormDisplay.addEventListener('submit', (e) => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim para remover espaços em branco 
    const usernameValue = usernameform.value.trim();
    const fullnameValue = fullnameform.value.trim();
    const cpfValue = cpfform.value.trim();
    const cepValue = cepform.value.trim();
    const streetValue = streetform.value.trim();
    const numberValue = numberform.value.trim();
    const cityValue = cityform.value.trim();
    const stateValue = stateform.value.trim();
    const countryValue = countryform.value.trim();
    const celValue = celform.value.trim();
    const emailValue = emailform.value.trim();
    const pswValue = pswform.value.trim();
    const psw2Value = psw2form.value.trim();
    
    const listOfNonMandatoryValues = [
        cepform, streetform, numberform, cityform, stateform, countryform
    ]

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
    
    //checagem de celular
	if(celValue === '') {
		setErrorFor(celform, 'numero de celular não pode estar em branco');
	} else {
		setSuccessFor(celform);
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

