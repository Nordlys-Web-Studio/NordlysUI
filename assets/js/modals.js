// cookies Modal

const cookies_modal = document.querySelector('.cookies-modal')
const cookies_modal_close_area = cookies_modal.querySelector('.cookies-modal-close-area')
const cookies_modal_close = cookies_modal.querySelector('.cookies-modal-close')
const cookies_modal_agree_button = cookies_modal.querySelector('.cookies-modal-agree-button')

const openTimeoutMs = 5000 // 5000ms = 5s

const isAllowedCookies = localStorage.getItem('isAllowedCookies') ? true : false


function setAsAllowedCookies(){
    localStorage.setItem('isAllowedCookies', 'true')
}


function keyCloseCookiesModalEvent(event){
    if(event.key === 'Escape' && isOpenCookiesModal()){
        closeCookiesModal()
        setAsAllowedCookies()
    }
}

function isOpenCookiesModal(){
    return cookies_modal.classList.contains('open')
}

function openCoockeisModal(){
    if(!isOpenCookiesModal()){
        cookies_modal.classList.add('open')
        document.addEventListener('keyup', keyCloseCookiesModalEvent)
        document.body.style['overflow-y'] = 'hidden'
    }
}

function closeCookiesModal(){
    if(isOpenCookiesModal()){
        cookies_modal.classList.remove('open')
        document.removeEventListener('keyup', keyCloseCookiesModalEvent)
        document.body.style['overflow-y'] = 'auto'
    }
}

document.addEventListener('DOMContentLoaded', function(){

    if(!isAllowedCookies){
        setTimeout(() => {
            openCoockeisModal()
        }, openTimeoutMs)
    }

    cookies_modal_close.addEventListener('click', ev => {
        closeCookiesModal()
        setAsAllowedCookies()
    })

    cookies_modal_agree_button.addEventListener('click', ev => {
        closeCookiesModal()
        setAsAllowedCookies()
    })

    cookies_modal_close_area.addEventListener('click', ev => {
        closeCookiesModal()
        setAsAllowedCookies()
    })
});
