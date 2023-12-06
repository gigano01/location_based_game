let gamedata = {}

onScreen(1, ()=>{
	setTimeout(nextScreen,3000)
})

onScreen(2, ()=>{
	createDialogueObject("dialogue/scherm2.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eendjetekst-s2"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(3, ()=>{
	createDialogueObject("dialogue/scherm3.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eendjetekst-s3"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

let audioContext 
let analyser

let gameFail = false
let tooLoud = false
function initGame(){
	audioContext = new (window.AudioContext || window.webkitAudioContext)()
	analyser = audioContext.createAnalyser()
	//TODO CRASH ALS INPUT NIET GEACCEPTEERD
	navigator.mediaDevices.getUserMedia({ audio: true })
	  .then(stream => {
		let source = audioContext.createMediaStreamSource(stream);
		source.connect(analyser)
		//analyser.connect(audioContext.destination)
		monitorLevels()
	  })
	  .catch(err => console.error('Error getting audio stream from microphone', err));
}

function monitorLevels() {
	if(getScreenNumber()==4){
		let data = new Uint8Array(analyser.frequencyBinCount)
		analyser.getByteFrequencyData(data)
		
		// Calculate volume as a percentage of the maximum volume
		let volume = Math.max(...data) / 255 * 100
		
		// Check if volume exceeds a certain limit
		let limit = gamedata["acceptabel-db-niveau"]; // Adjust this value as needed
		
		if (volume > limit) {
			gameFail = true
			tooLoud = true
			gotoScreen(5);
		}

		document.getElementById('volumeBar-s4').value = volume
		document.getElementById('volumeBar-s4').max = limit
		
	}
	requestAnimationFrame(monitorLevels)
}

onScreen(4, ()=>{
	initGame()

	let statueCount = 1
	const upButton = document.getElementById("up-s4")
	const downButton = document.getElementById("down-s4")
	const greenBlock = document.getElementById("cijfer-s4")

	upButton.onclick = ()=>{
		if(statueCount < 99){
			statueCount++
		}
		greenBlock.textContent = statueCount
	}
	downButton.onclick = ()=>{
		if(statueCount > 1){
			statueCount--
		}
		greenBlock.textContent = statueCount
	}

	document.getElementById("indienen-s4").onclick = ()=>{
		console.log(gamedata["aantal-standbeelden"])
		if (statueCount == gamedata["aantal-standbeelden"]) {
			nextScreen()
		} else{
			gameFail = true
			nextScreen()
		}
	}
})

onScreen(5, ()=>{
	let dialogueLoc
	if (gameFail) {
		dialogueLoc = (tooLoud) ? "dialogue/scherm5_fail_loud.json" : "dialogue/scherm5_fail_miscount.json"
	} else {
		dialogueLoc = "dialogue/scherm5_succes.json"
	}

	createDialogueObject(dialogueLoc).then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eendjetekst-s5"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(6,()=>{
	//TODO: punten
	nextScreen()
})

onScreen(7,()=>{
	createDialogueObject("dialogue/scherm7.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eendjetekst-s7"))
		setDialogueEndHandler(dialogue,()=>{
			const nextlocID = "theaterplein-01"
			location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
		})
	})
})

docReady(async ()=>{
	const fetched = await fetch("../../../data/begijnhof_game_data.json")
	gamedata = await fetched.json()
	console.log(gamedata)
	gotoScreen(1)
})