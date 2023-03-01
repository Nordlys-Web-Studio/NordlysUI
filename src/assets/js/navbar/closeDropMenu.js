const listItems = document.querySelectorAll('.mega_m > ul > li')
listItems.forEach(el => {
	el.addEventListener('click', (e) => {
		document.querySelector('.menu').classList.remove('menu_state_open')
		if (document.querySelector('.menu').classList.contains('menu_state_open')) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	})
});