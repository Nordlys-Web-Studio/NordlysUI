function reCaptchResponse(response){
	const $recaptchaInput = document.querySelector('#id_recaptcha_input')
	$recaptchaInput.value = response
}

function reCaptchErrorResponse(response){
	const $recaptchaInput = document.querySelector('#id_recaptcha_input')
	$recaptchaInput.value = ''
}

var onloadCallback = function() {
    grecaptcha.render('id_recaptcha_container', {
      'sitekey' : '6LdAMZIkAAAAAIU0ohinOyUuoOe_Y9y43jvl346B',
      'callback': reCaptchResponse,
      'error-callback': reCaptchErrorResponse,
      'hl': 'uk'
    });
  };