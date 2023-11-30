let quizData = {}
//SCHERM 1
//TODO MAAK DIT DYNAMISCH

onScreen(1, ()=>{
	let firstdialogue
	if(quizData["eerste-keer"]){
		firstdialogue = "dialogue/dialogue01.json"
	} else {
		firstdialogue = "dialogue/dialogue_repeat.json"
	}
	createDialogueObject(firstdialogue).then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisje-s1-tekstbubbel"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

//SCHERM 2
onScreen(2, ()=>{
	setTimeout(nextScreen, 1200)
})

//SCHERM 3
onScreen(3, ()=>{
	if(quizData["eerste-keer"]){
		setTimeout(nextScreen, 1200)
	} else {
		setTimeout(()=>{gotoScreen(5)}, 1200)
	}
	
})

//SCHERM 4
onScreen(4, ()=>{
	createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisje-s4-tekstbubbel"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(5, ()=>{
	let firstdialogue
	if(quizData["eerste-keer"]){
		firstdialogue = "dialogue/scherm5.json"
	} else {
		firstdialogue = "dialogue/scherm5_repeat.json"
	}
	createDialogueObject(firstdialogue).then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisje-s5-tekstbubbel"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(6, ()=>{
	let question = document.querySelector("#vraag p")
	let answer1 = document.querySelector("#antwoord-1 p")
	let answer2 = document.querySelector("#antwoord-2 p")
	let answer3 = document.querySelector("#antwoord-3 p")

	question.textContent = quizData["vraag"]

	let ansArray = JSON.parse(localStorage.getItem("answer-array"))
	let correctAnswer = localStorage.getItem("correct-answer")

	if(ansArray === null){
		//antwoorden willekeurig sorteren
		let wrongAnwserCount = quizData["foute-antwoorden"].length
		let random1 = Math.round(Math.random() * 2 + 1) //willeukeurig nummer voor locatie juist antwoord
		let random2 = Math.round(Math.random() * wrongAnwserCount + 1) // willekeurig nummer voor startpositie selectie foute antwoorden

		//steek alle foute antwoorden in de array
		ansArray = []
		for (let i = 0; i < 3; i++) {
			ansArray[i] = quizData["foute-antwoorden"][(i + random2) % wrongAnwserCount]
		}
		//steek nu het juiste antwoord er bij
		ansArray[random1 - 1] = quizData["juist-antwoord"]

		//log het want waarom niet
		console.log(ansArray)
		localStorage.setItem("correct-answer", random1)
		localStorage.setItem("answer-array",JSON.stringify(ansArray))
	}

	answer1.textContent = ansArray[0]
	answer2.textContent = ansArray[1]
	answer3.textContent = ansArray[2]

	


})

onScreen(7, ()=>{
	createDialogueObject("dialogue/temp_scherm7.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisje-s7-tekstbubbel"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(8, ()=>{
	createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisje-s8-tekstbubbel"))
		setDialogueEndHandler(dialogue,()=>{
			document.getElementById("code-visibility").classList.remove("invisible");
			dialogue,document.getElementById("muisje-s8-tekstbubbel").onclick = ()=> {nextScreen()}
		})
	})
})

onScreen(9, ()=>{
	setTimeout(nextScreen,3800)
})

onScreen(11, ()=>{
	setTimeout(nextScreen,1500)
})

onScreen(12, ()=>{
	createDialogueObject("dialogue/scherm12.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisje-s12-tekstbubbel"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen() //TEMPORARY
		})
	})
})



docReady(async ()=>{
	const fetched = await fetch("../../../data/vault_data.json")
	const vaultData = await fetched.json()
	const locationID = getQueryParam("id")

	//console.log(vaultData)
	quizData = vaultData[locationID]
	//console.log(quizData)
	if (quizData === undefined) {
		console.error("invalid location id")
	}
	gotoScreen(6)
})