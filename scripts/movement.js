let __MOUSEX
let __MOUSEY
let __DX
let __DY
let __INITX
let __INITY
let __DRAGGING = false

let onMovementHandler = () => {}
let onDragHandler = () => {}

function getMTPosition(){
	return {x: __MOUSEX,y: __MOUSEY}
}

function getCurrentDrag(){
	return {x: __DX,y: __DY}
}

//javascript is heel raar met dit soort dingen, maar dit is hoe je het doet bewegen.
document.addEventListener('touchmove', function(e) {
	//e.preventDefault()
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



function startDrag(e) {
	__DRAGGING = true
	__INITX = e.clientX || e.touches[0].clientX
	__INITY = e.clientY || e.touches[0].clientY
}

function drag(e) {
	if (!__DRAGGING) return;
	
	__DX = (e.clientX || e.touches[0].clientX) - __INITX
	__DY = (e.clientY || e.touches[0].clientY) - __INITY
	//console.log(__DX)
	onDragHandler()
}

function endDrag() {
	__DRAGGING = false;
}

document.addEventListener('mousedown', startDrag, false)
document.addEventListener('touchstart', startDrag, false)

document.addEventListener('mousemove', drag, false)
document.addEventListener('touchmove', drag, false)

document.addEventListener('mouseup', endDrag, false)
document.addEventListener('touchend', endDrag, false)