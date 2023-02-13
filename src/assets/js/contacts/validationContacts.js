const inputName = document.querySelector('.input-name')
const inputEmail = document.querySelector('.input-email')
const checkMenu = document.querySelector('.contacts__check')

const buttonSubmit = document.querySelector('.button-form')

// document.addEventListener('DOMContentLoaded',(e)=>{
// 	const form = document.querySelector(".contacts-form");
// 	form.addEventListener('submit',()=>{
// 		if(inputName.value === "" && inputName.value === null){
// 			inputName.classList.add('_error')
// 		}if(inputName.value <=0){
// 			inputName.classList.add('_error')
// 		}
// 		else{
// 			inputName.classList.remove('_error')
// 		}
// 	})
// })
const form = document.querySelector(".contacts-form");
	const invalidSymbol =
		/[\/\.\,\'\\\"\`\(\)\-\\₴\=\+\_\?\[\]\{\}\<\>\!\@\#\$\%\^\&\*]/;
	const upperCaseLetters = /[A-Z]/g;
	const lowerCaseLetters = /[a-z]/g;
	const numbers = /[0-9]/;
	const eu = /[a-z]+/gi;

	form.addEventListener("submit", FormSend);
	FormValidateInput(form);

	async function FormSend(e) {
		e.preventDefault();
		let error = FormValidateBtn(form);
	}

	// function FormValidateBtn(form) {
	// 	let error = 0;
	// 	// const input = document.querySelector(".input-name");
	// 	// FormRemoveError(input);
	// 	if (inputName.value === "" || inputName.value === null) {
	// 		FormAddError(input);
	// 		error++;
	// 		console.log(error)
	// 	}
	// 	return error;
	// }
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
				//------Email-----------
				// if (input.classList.contains("input-email")) {
				// 	if (!ValidateEmail(input)) {
				// 		FormAddError(input);
				// 		error++;
				// 	}
				// }
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
	//------Email-----------
	// function ValidateEmail(input) {
	// 	const emailError =
	// 		/^(([^<>()[\]\\.,;:\s@"\s]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]\s)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// 	return emailError.test(input.value);
	// }
	// //------Password-----------
	// function ValidatePassword(input) {
	// 	if (input.value.length < 6) {
	// 		FormAddError(input);
	// 	}
	// 	if (input.value.match(invalidSymbol)) {
	// 		FormAddError(input);
	// 	}
	// }
	//------Password Confirm-----------
	// function ValidateConfirm(input) {
	// 	const password = document.querySelector(".sign-up._password");

	// 	if (input.value !== password.value) {
	// 		FormAddError(input);
	// 	}
	// }