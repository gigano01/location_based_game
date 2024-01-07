onScreen(1,()=>{
	setTimeout(nextScreen, 1000)
})

onScreen(2,()=>{
	setTimeout(nextScreen, 2500)
})

onScreen(3, ()=>{
	let gansElement = document.querySelector("#wasbeer-s3");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject("dialogue/scherm3.json").then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("wasbeertekst-s3"))
			setDialogueEndHandler(dialogue,()=>{
				nextScreen()
			})
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

const edible = ["vis-s5","kaas-s5","brood-s5","broccoli-s5"]
function isEdible(node){
	return edible.includes(node.id)
}

const trashObjects = document.getElementsByClassName("afval-s5")
const trashcanGreen = document.getElementById("vuilbakgroen-s5")
const trashcanGrey = document.getElementById("compostpot-s5")
let fallingItem = null
let fallingX = 0
let fallingY = -50
const sideMargin = 40 // in percentage
const w = document.defaultView.innerWidth
const h = document.defaultView.innerHeight
const fallingSpeed = 3.7
const speedupBias = 7
let tries = 0
let fail = false
let timerID = null

let playing = false


const maxTimeInMinutes = 1 //make dynamic!!
const maxTimeInSeconds = maxTimeInMinutes * 60
let time = maxTimeInSeconds

function timer(){
	const timerDiv = document.getElementById("kader-s5")

	if(time > 0) {
		time--
	} else {
		clearInterval(timerID)
		nextScreen()
	}

	if(time < 10) {
		timerDiv.textContent = `${time}`
	}else{
		timerDiv.textContent = `${Math.floor(time/60)}:${time % 60}`
	}

	//clearInterval(timer)
}

function game() {
	if(!playing){
		console.log("?????")
		return
	} //zorgt er voor dat ie niet ineens willekeurig alle schermen skipt om een of andere domme redene.

	const randomNum = Math.round(Math.random()*(trashObjects.length-1))
	
	if (fallingItem === null){
		fallingItem = trashObjects[randomNum]
		fallingX = Math.random() * (w * ((100 - sideMargin) / 100)) + (w * sideMargin / 100) / 2.5
		fallingY = -100
	}

	//GOD FORGIVE ME ;-;
	if (overlaps(fallingItem, trashcanGrey)){
		fallingItem.style.display = "none"
		if(!isEdible(fallingItem, trashcanGrey)){
			fallingItem = null
			requestAnimationFrame(game)
			return
		} else {
			clearInterval(timerID)
			document.getElementById("kader-s6").textContent = `${Math.floor(time/60)}:${time % 60}`
			document.getElementById("kader-s5").textContent = `start!`
			fail = true
			playing = false
			gotoScreen(6)
			return
		}
	}else if(overlaps(fallingItem, trashcanGreen)){
		fallingItem.style.display = "none"
		if (isEdible(fallingItem)){
			fallingItem = null
			requestAnimationFrame(game)
			return
		} else {
			clearInterval(timerID)
			document.getElementById("kader-s6").textContent = `${Math.floor(time/60)}:${time % 60}`
			document.getElementById("kader-s5").textContent = `start!`
			fail = true
			playing = false
			gotoScreen(6)
			return
		}
	}

	fallingY += fallingSpeed + ((maxTimeInSeconds - time ) / speedupBias)
	console.log((maxTimeInSeconds - time ) / speedupBias)


	fallingItem.style.left = `${fallingX}px`
	fallingItem.style.top = `${fallingY}px`
	fallingItem.style.display = "block"

	requestAnimationFrame(game)
}

onScreen(5,()=>{
	//reset alles voor als we gefaald hebben
	fallingItem = null
	fallingX = 0
	fallingY = -50
	time = maxTimeInSeconds
	playing = true
	timerID = setInterval(timer, 1000)

	const trashcan = document.getElementById("vuilbakgroen-s5")
	onMovementHandler = () => {
		let pos = getMTPosition()
		let x = pos.x
		let y = pos.y
	
		trashcan.style.left = `${x}px`
		trashcan.style.top = `${y}px`
	}
	requestAnimationFrame(game)
})

onScreen(6, ()=>{
	let dialogueLoc
	if (fail) {
		dialogueLoc = (tries > 1) ? "dialogue/scherm6_fail_final.json" : "dialogue/scherm6_fail.json"
		tries++
	} else {
		dialogueLoc = "dialogue/scherm6.json"
	}

	if(tries === 4) {
		gotoScreen(7)
		return
	}

	createDialogueObject(dialogueLoc).then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("wasbeertekst-s6"))
		setDialogueEndHandler(dialogue,()=>{
			if (fail) {
				removeDialogueFromContainer(dialogue)
				fail = false
				gotoScreen(5)
			} else {
				nextScreen()
			}
		})
	})
})

onScreen(7, ()=>{
	let dialogueText
	if(fail){
		dialogueText = "dialogue/scherm7_fail.json"
	}else{
		dialogueText = "dialogue/scherm7.json"
	}
	createDialogueObject(dialogueText).then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("wasbeertekst-s7"))
		setDialogueEndHandler(dialogue,()=>{
			// const nextlocID = "kmska-01"
			// location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
			nextScreen()
		})
	})
})

onScreen(8, ()=>{
	showStars(Math.max(1, 3 - tries))
	saveStars()
	document.onclick = ()=> {
		const nextlocID = "kmska-01"
		location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
	}
})

docReady(async ()=>{
	gotoScreen(1)
}) 