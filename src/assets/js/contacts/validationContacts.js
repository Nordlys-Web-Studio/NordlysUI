const inputName = document.querySelector('.input-name')
const inputEmail = document.querySelector('.input-email')
const checkMenu = document.querySelector('.contacts__check')

const buttonSubmit = document.querySelector('.button-form')

const form = document.querySelector(".contacts-form");
const invalidSymbol =
	/[\/\.\,\'\\\"\`\(\)\-\\₴\=\+\_\?\[\]\{\}\<\>\!\№\;\:\@\#\$\%\^\&\*]/;
const upperCaseLetters = /[A-Z]/g;
const lowerCaseLetters = /[a-z]/g;
const numbers = /[0-9]/;
const eu = /[a-z]+/gi;

form.addEventListener("submit", FormSend);
FormValidateInput(form);

async function FormSend(e) {
	e.preventDefault();
	const error = FormValidateBtn(form);
	const recaptchaIsValid = reCaptchValidation()
	console.log(recaptchaIsValid)
	if(error !== 0 || !recaptchaIsValid){
		console.log('some error')
	}
	else{
		console.log('send form')
	}
	// form.submit()
}

function FormValidateBtn(form) {
	let error = 0;
	// FormRemoveError(input);
	if (inputName.value === "" || inputName.value === null) {
		FormAddError(inputName);
		error++;
	}
	if (!checkMenu.classList.contains('_selected')) {
		FormAddError(checkMenu)
		error++
	}
	return error;
}

//Перевірка відразу після нажаття кнопки
function FormValidateInput(form) {
	let error = 0;
	const inputsReq = document.querySelectorAll("input");
	for (let index = 0; index < inputsReq.length; index++) {
		const input = inputsReq[index];

		input.addEventListener("input", () => {
			FormRemoveError(input);
			input.value = input.value.replace(numbers, "");
			input.value = input.value.replace(invalidSymbol, "");
			if (input.value === "" || input.value === null) {
				FormAddError(input);
				error++;
			}
			//----Name----------
			if (input.classList.contains("input-name")) {
				ValidateName(input);
				error++;
			}
		});
	}
	return error
}
function FormAddError(input) {
	// input.parentElement.classList.add("_error");
	input.classList.add("_error");
}
function FormRemoveError(input) {
	// input.parentElement.classList.remove("_error");
	input.classList.remove("_error");
}
//----- Name
function ValidateName(input) {

	if (input.value.match(invalidSymbol)) {
		FormAddError(input);
	}
	if (input.value.match(numbers)) {
		FormAddError(input);
	}
	if (input.value.length <= 1) {
		FormAddError(input);
	}
}

function reCaptchValidation(){
	const $recaptch_error = document.querySelector('#id_recaptch_error')
	const $recaptchaInput = document.querySelector('#id_recaptcha_input')

	$recaptch_error.innerHTML = !$recaptchaInput.value ? "* Це поле обов'язкове" : ''
	
	return !$recaptchaInput.value ? false: true
}