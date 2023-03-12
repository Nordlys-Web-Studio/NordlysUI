function callBlockReCaptchResponse(response){
	const $recaptchaInput = document.querySelector('#id_call_block_recaptcha_input')
	$recaptchaInput.value = response
}

function callBlockReCaptchErrorResponse(response){
	const $recaptchaInput = document.querySelector('#id_call_block_recaptcha_input')
	$recaptchaInput.value = ''
}

var callBlockOnloadCallback = function() {
    grecaptcha.render('id_call_block_recaptcha_container', {
      'sitekey' : '6LdAMZIkAAAAAIU0ohinOyUuoOe_Y9y43jvl346B',
      'callback': callBlockReCaptchResponse,
      'error-callback': callBlockReCaptchErrorResponse,
      'hl': 'uk'
    });
  };


const buttonCall = document.querySelector('.button.small')
const callBlockContent = document.querySelector('.call-block__content')
const callBlock = document.querySelector('.call-block')
buttonCall.addEventListener('click', () => {
	if (!callBlockContent.classList.contains('open')) {
		OpenCallBlock(callBlock)
	} else {
		CloseCallBlock(callBlock)
	}
})
window.addEventListener('load', () => {
	document.addEventListener('click', (e) => {
		if (!e.target.closest(".button.small") && !e.target.closest(".call-block__content")) {
			CloseCallBlock(callBlock)
		}
		else if(e.target.closest('.call-block__close')){
			CloseCallBlock(callBlock)
		}

	})
	document.addEventListener('keydown',(e)=>{
		if(e.key === 'Escape'){
			CloseCallBlock(callBlock)
		}
	})
})
callBlockContent.addEventListener('submit',(e)=>{
	e.preventDefault()
})

function OpenCallBlock(obj) {
	obj.classList.add('open')
}
function CloseCallBlock(obj) {
	obj.classList.remove('open')
}

async function sendReuqestPhoneCall(phone, recaptcha){
	const url = `${URLS.request_call.api_uri}/request-calls/`
	const data = {
		phone: phone,
		recaptcha: recaptcha
	}
	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
}


async function processCallModalRequest(form){
	const $phone = form.querySelector('#phone')

	const $recaptcha = form.querySelector('#id_call_block_recaptcha_input')
	const $recaptcha_error = form.querySelector('#id_call_block_recaptch_error')
	$recaptcha_error.innerHTML =  !$recaptcha.value ? 'Це поле обов`язкове!' : ''
	if(!$recaptcha.value){
		return
	}

	const response = await sendReuqestPhoneCall($phone.value, $recaptcha.value)
	
	if(response.status !== 201){
        Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Невдалося відправити дані. Спробуйте ще раз.'
        })
    }
    else{
        Swal.fire({
            icon: 'success',
            title: 'Успішно',
            text: 'Дякуємо! Ваша заявка прийнята. Ми з вами зв`яжимося як найшвидше.'
        })
    }

	return false
}
