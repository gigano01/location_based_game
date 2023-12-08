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