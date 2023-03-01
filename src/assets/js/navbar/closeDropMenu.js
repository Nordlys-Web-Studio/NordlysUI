const listItems = document.querySelectorAll('.mega_m > ul > li')
listItems.forEach(el => {
	el.addEventListener('click', (e) => {
		document.querySelector('.menu').classList.remove('menu_state_open')
	})
});