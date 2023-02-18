async function sendContactsForm(){
    const url = `${URLS.contacts.api_uri}/contacts/`

    const recaptch = document.querySelector('#id_recaptcha_input').value
    const user_name = document.querySelector('#id_user_name').value
    const user_phone = document.querySelector('#id_user_phone').value
    const user_message = document.querySelector('#id_user_message').value
    const site_type = document.querySelector('#site-type').dataset.siteType

    const data = {
        recaptcha: recaptch,
        name: user_name,
        phone: user_phone,
        message: user_message,
        site_type: site_type
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    })

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

}
