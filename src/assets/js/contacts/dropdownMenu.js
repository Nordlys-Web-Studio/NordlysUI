const $checkMenu = document.querySelector('.contacts__check')
const checkBlock = document.querySelector('.check-block__item')
const checkItems = document.querySelectorAll('.check-item')
let spanCheckItem = document.getElementById('item')

$checkMenu.addEventListener('click', () => {
	OpenMenu($checkMenu)
	OpenMenu(checkBlock)

	// if ($checkMenu.classList.contains('_selected')) {
	// 	$checkMenu.classList.remove('_error')
	// }
})

for (let i = 0; i < checkItems.length; i++) {
	const element = checkItems[i];
	element.addEventListener('click', (e) => {
		CloseMenu(checkBlock)
		CloseMenu($checkMenu)
		if (element.classList.contains('item__business')) {
			$checkMenu.dataset.siteType = "Visitka"
			AddOrRemoveError($checkMenu)
			spanCheckItem.innerHTML = "Сайт - Візитка"
		} else if (element.classList.contains('item__landing')) {
			$checkMenu.dataset.siteType = "Landing"
			AddOrRemoveError($checkMenu)
			spanCheckItem.innerHTML = "Landind Page"
		}
		else {
			$checkMenu.dataset.siteType = "Corporation"
			AddOrRemoveError($checkMenu)
			spanCheckItem.innerHTML = "Корпоративний сайт"
		}

	})
}

function OpenMenu(obj) {
	if (!obj.classList.contains('_active')) {
		obj.classList.add('_active')
	} else {
		obj.classList.remove('_active')
	}
}
function CloseMenu(obj) {
	if (obj.classList.contains('_active')) {
		obj.classList.remove('_active')
	}
}
function AddOrRemoveError(obj) {
	obj.classList.add('_selected')
	obj.classList.remove('_error')
}