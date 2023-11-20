var __MOUSEX
var __MOUSEY

let onMovementHandler = () => {}

function getMTPosition(){
	return {x: __MOUSEX,y: __MOUSEY}
}

//javascript is heel raar met dit soort dingen, maar dit is hoe je het doet bewegen.
document.addEventListener('touchmove', function(e) {
	e.preventDefault()
	let touch = e.touches[0]
	__MOUSEX = touch.pageX
	__MOUSEY = touch.pageY

	onMovementHandler()
}, false)

//en dit is voor het op de computer te laten werken.
document.addEventListener('mousemove', (e) => {
	//console.log(`mouse position: ${event.x}:${event.y}`);

	__MOUSEX = e.x
	__MOUSEY = e.y

	onMovementHandler()
})