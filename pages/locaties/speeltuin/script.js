onScreen(1,()=>{
	setTimeout(nextScreen, 1000)
})

onScreen(2,()=>{
	setTimeout(nextScreen, 800)
})

onScreen(3, ()=>{
	createDialogueObject("dialogue/scherm3.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("wasbeertekst-s3"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(4, ()=>{
	createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("wasbeertekst-s4"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

const maxTimeInMinutes = 2 //make dynamic!!
const maxTimeInSeconds = maxTimeInMinutes * 60
let time = maxTimeInSeconds

function timer(){
	let timerDiv = document.getElementById("kader-s5")

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

onScreen(5,()=>{
	time = maxTimeInSeconds
	setInterval(timer, 1000)

	const trashcan = document.getElementById("vuilbakgroen-s5")
	onMovementHandler = () => {
		let pos = getMTPosition()
		let x = pos.x
		let y = pos.y
	
		trashcan.style.left = `${x}px`
		trashcan.style.top = `${y}px`
	}
})

onScreen(6, ()=>{
	createDialogueObject("dialogue/scherm6.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("wasbeertekst-s6"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(7, ()=>{
	createDialogueObject("dialogue/scherm7.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("wasbeertekst-s7"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

docReady(async ()=>{
	gotoScreen(1)
})