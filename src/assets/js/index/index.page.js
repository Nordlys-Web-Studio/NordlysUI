// sweet alert with technology info
const tech_images = document.querySelectorAll('.tech_image')
tech_images.forEach(el => {
    el.addEventListener('click', ev => {
        Swal.fire({
            title: `<strong>${el.dataset.alert_title ? el.dataset.alert_title : ''}<\strong>`,
            html: `<img src="${el.src ? el.src : '#'}" style="max-width: 128px;"/> <br /> <p class="mt-4">${el.dataset.alert_text ? el.dataset.alert_text : ''}</p>`
        })
    })
})

// Section Stages of development. Swap section 4 and 6 if screen width is less than 768px.А
document.addEventListener('DOMContentLoaded', ev => {
    if(window.innerWidth < 768){
        const $square_six = document.querySelector('#id_square_six')
        const square_six_html = $square_six.innerHTML
        const $square_four = document.querySelector('#id_square_four')
        const $square_five = document.querySelector('#id_square_five')
        
        $square_six.parentNode.replaceChild($square_four, $square_six)
        $square_five.insertAdjacentElement('afterEnd', $square_six)
    }
})