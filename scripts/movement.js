var __MOUSEX
var __MOUSEY

function getMTPosition(){
	return {__MOUSEX, __MOUSEY}
}

//javascript is heel raar met dit soort dingen, maar dit is hoe je het doet bewegen.
document.addEventListener('touchmove', function(e) {
	e.preventDefault()
	let touch = e.touches[0]
	__MOUSEX = touch.pageX
	__MOUSEY = touch.pageY
}, false)

//en dit is voor het op de computer te laten werken.
document.addEventListener('mousemove', (e) => {
	//console.log(`mouse position: ${event.x}:${event.y}`);

	vierkant.style.left = e.x
	vierkant.style.top = e.y
})