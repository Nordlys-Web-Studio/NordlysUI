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