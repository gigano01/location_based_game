let gamedata = {}
let gameIteration //i variabele voor het spel :D
let gameInterval
let gameAcceptInput

onScreen(1, ()=>{
	setTimeout(nextScreen,3000)
})

onScreen(2, ()=>{
	setTimeout(nextScreen,1500)
})

onScreen(3, ()=>{
	createDialogueObject("dialogue/scherm3.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s3"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(4, ()=>{
	createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s4"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(5, ()=>{
	createDialogueObject("dialogue/scherm5.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s5"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(6, ()=>{
	createDialogueObject("dialogue/scherm6.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s6"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
			//gotoScreen(10)
		})
	})
})

function turnOffAllDirections(arrow){
	arrow.classList.remove("omlaag-spel")
	arrow.classList.remove("rechts-spel")
	arrow.classList.remove("omhoog-spel")
	arrow.classList.remove("links-spel")
}

function gameDialoguePopup() {
	document.getElementById("popup-s7").classList.remove("invisible")
	createDialogueObject("dialogue/scherm7.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s7"))
		removeDialogueFromContainer(dialogue) //maakt het onklikbaar
	})
}

function game(){
	const move = gamedata["moves"][gameIteration]
	let count = document.getElementById("aantal-keren-spel")
	let arrow = document.getElementById("pijl-spel")

	turnOffAllDirections(arrow)
	switch (move["direction"]) {
		case "up":
			arrow.classList.add("omhoog-spel")
			break
		case "left":
			arrow.classList.add("links-spel")
			break
		case "down":
			arrow.classList.add("omlaag-spel")
			break
		case "right":
			arrow.classList.add("rechts-spel")
			break
		default:
			break
	}

	count.textContent = move["amount"]
	console.log(`${gameIteration} / ${gamedata["moves"].length}`)
	console.log()
	gameIteration++

	if(gameIteration >= gamedata["moves"].length) {
		clearInterval(gameInterval)
		gameAcceptInput = true
		gameDialoguePopup()
	}
}

function setupBoard() {
	let tbody = document.getElementById("chessboard-s7")
	let y = 0
	let x = 0
	//lord forgive me for i have sinned
	for (tr of tbody.children) {
		y++
		x = 0
		for (td of tr.children) {
			x++;
			//als we dan toch bezig zijn doen we ineens aan zwarte magie
			(function(_x, _y, _td) {
				_td.onclick = () => {
					if (gameAcceptInput){
						if (_x == gamedata["winnende-locatie"]["x"] && _y == gamedata["winnende-locatie"]["y"]){
							nextScreen()
						} else {
							document.getElementById("popup-s7").classList.remove("invisible")
							createDialogueObject("dialogue/scherm7_fout.json").then((dialogue)=>{
								assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s7"))
								removeDialogueFromContainer(dialogue) //maakt het onklikbaar

								gameAcceptInput = false //anders breek je het spel lol
								setTimeout(gotoScreen, 2000, 7)
							})
						}
					}
				};
			})(x, y, td);
		}
	}
}

onScreen(7, ()=>{
	const delay = 3000
	gameIteration = 0 //i variabele voor het spel :D
	gameInterval = null
	gameAcceptInput = false

	setupBoard()
	game() //we doen het al een keer zodat je de placeholders niet ziet
	gameInterval = setInterval(game, delay)
	/*
	createDialogueObject("dialogue/scherm7.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s7"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
	*/
})

onScreen(8, ()=>{
	createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s8"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(9,nextScreen)
onScreen(10,()=>{
	createDialogueObject("dialogue/scherm10.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s10"))
		setDialogueEndHandler(dialogue,()=>{
			const nextlocID = "botanischetuin-01"
			location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
		})
	})
})

docReady(async ()=>{
	const fetched = await fetch("../../../data/graanmarkt_game_data.json")
	gamedata = await fetched.json()

	gotoScreen(1)
})