onScreen(1, ()=>{
	setTimeout(nextScreen,3000)
})

onScreen(2, ()=>{
	setTimeout(nextScreen,800)
})

onScreen(3, ()=>{
	createDialogueObject("dialogue/scherm3.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s3"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(4, ()=>{
	createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s4"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

let gameDragging = null
const mouseTracker = document.getElementById("mousetracker-s5")
const flower1 = document.getElementById("bloemspel-1-s5")
const flower1T = flower1.style.top
const flower1L = flower1.style.left
const flower2 = document.getElementById("bloemspel-2-s5")
const flower2T = flower2.style.top
const flower2L = flower2.style.left
const flower3 = document.getElementById("bloemspel-3-s5")
const flower3T = flower3.style.top
const flower3L = flower3.style.left

const maxTimeInMinutes = 1 //make dynamic!!
const maxTimeInSeconds = maxTimeInMinutes * 60
let time = maxTimeInSeconds

function timer(){
	let timerDiv = document.getElementById("timer-s5")

	if(time > 0) {
		time--
	}

	if(time < 10) {
		timerDiv.textContent = `${time}`
	}else{
		timerDiv.textContent = `${Math.floor(time/60)}:${time % 60}`
	}

	clearInterval(timer)
}

const fountain = document.getElementById("fontijn-s5")

function flowerBehaviour(flower, flowerT, flowerL){

	if(overlaps(mouseTracker, flower) && __DRAGGING){
		if(gameDragging != flower && gameDragging != null) {return}
		flower.style.top = `${getMTPosition().y}px`
		flower.style.left = `${getMTPosition().x}px`
		gameDragging = flower
	}else{
		if(overlaps(flower, fountain)){
			flower.style.display = "none"
			console.log("disabled")
		}
		flower.style.top = flowerT
		flower.style.left = flowerL
		gameDragging = null
	}
}

function gameLoop(){
	mouseTracker.style.left = `${getMTPosition().x}px`
	mouseTracker.style.top = `${getMTPosition().y}px`
	flowerBehaviour(flower1, flower1T, flower1L)
	flowerBehaviour(flower2, flower2T, flower2L)
	flowerBehaviour(flower3, flower3T, flower3L)


	requestAnimationFrame(gameLoop)
}

onScreen(5, ()=>{
	time = maxTimeInSeconds
	setInterval(timer, 1000)
	gameLoop()
})
onScreen(6,nextScreen)
onScreen(7, nextScreen)
onScreen(8, ()=>{
	createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s8"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})
onScreen(9, nextScreen)
onScreen(10, ()=>{
	createDialogueObject("dialogue/scherm10.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s10"))
		setDialogueEndHandler(dialogue,()=>{
			console.log("that was it boys, end of da game")
		})
	})
})

docReady(async ()=>{
	gotoScreen(1)
})