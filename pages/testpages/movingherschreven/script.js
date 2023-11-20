const startButton = document.querySelector('#start-button')

let vierkant = document.getElementById("test-object")
let vallendVierkant = document.getElementById("vallend-object")

onMovementHandler = () => {
	let pos = getMTPosition()
	let x = pos.x
	let y = pos.y

	vierkant.style.left = `${x - 50}px`
	vierkant.style.top = `${y - 50}px`
}


//VALLEND OBJECT TEST
let x,y = 0
setInterval(() => {
	
	let height = window.innerHeight
	let width = window.innerWidth

	y += 5

	if (y > height) {
		y = -100
		x = Math.random() * (width-100)
	}
	console.log(x)

	//zet de x en y waarden
	vallendVierkant.style.left = x + "px"
	vallendVierkant.style.top = y + "px"


	//als de twee divs op elkaar vallen dan willen we de kleur veranderen.
	if (overlaps(vierkant, vallendVierkant)) {
		vallendVierkant.style.backgroundColor = "rgb(174, 8, 8)"
	} else {
		vallendVierkant.style.backgroundColor = "rgb(45, 145, 5)";
	}
},20)

