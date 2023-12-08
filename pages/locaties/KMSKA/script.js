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
flower1T = flower1.style.top
flower1L = flower1.style.left
const flower2 = document.getElementById("bloemspel-2-s5")
flower2T = flower2.style.top
flower2L = flower2.style.left
const flower3 = document.getElementById("bloemspel-3-s5")
flower3T = flower3.style.top
flower3L = flower3.style.left

const fountain = document.getElementById("fontijnspel-s4")

function gameLoop(){
	mouseTracker.style.left = `${getMTPosition().x}px`
	mouseTracker.style.top = `${getMTPosition().y}px`
	if(overlaps(mouseTracker, flower1) && __DRAGGING){
		flower1.style.top = `${getMTPosition().y}px`
		flower1.style.left = `${getMTPosition().x}px`
		gameDragging = flower1
	}else{
		flower1.style.top = flower1T
		flower1.style.left = flower1L
	}
	if(overlaps(mouseTracker, flower2) && __DRAGGING){
		flower2.style.top = `${getMTPosition().y}px`
		flower2.style.left = `${getMTPosition().x}px`
	}
	else{
		flower2.style.top = flower2T
		flower2.style.left = flower2L
	}
	if(overlaps(mouseTracker, flower3) && __DRAGGING){
		flower3.style.top = `${getMTPosition().y}px`
		flower3.style.left = `${getMTPosition().x}px`
	}
	else{
		flower3.style.top = flower3T
		flower3.style.left = flower3L
	}


	requestAnimationFrame(gameLoop)
}

onScreen(5, ()=>{
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
			const nextlocID = ""
			location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
		})
	})
})

docReady(async ()=>{
	gotoScreen(1)
})