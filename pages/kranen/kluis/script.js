let quizData = {}
let wrongCount = 0
//SCHERM 1
//TODO MAAK DIT DYNAMISCH

onScreen(1, ()=>{
	let firstdialogue
	if(quizData["eerste-keer"]){
		firstdialogue = "dialogue/dialogue01.json"
	} else {
		firstdialogue = "dialogue/dialogue_repeat.json"
	}
	let gansElement = document.querySelector("#muisje-s1");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject(firstdialogue).then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("muisje-s1-tekstbubbel"))
			setDialogueEndHandler(dialogue,()=>{
				nextScreen()
			})
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
	let gansElement = document.querySelector("#muisje-s4");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("muisje-s4-tekstbubbel"))
			setDialogueEndHandler(dialogue,()=>{
				nextScreen()
			})
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
	let gansElement = document.querySelector("#muisje-s5");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject(firstdialogue).then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("muisje-s5-tekstbubbel"))
			setDialogueEndHandler(dialogue,()=>{
				nextScreen()
			})
		})
	})
})

onScreen(6, ()=>{
	let question = document.querySelector("#vraag p")
	let answer1 = document.querySelector("#antwoord-1 p")
	let answer2 = document.querySelector("#antwoord-2 p")
	let answer3 = document.querySelector("#antwoord-3 p")
	let buttons = document.getElementsByClassName("antwoord")

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
		correctAnswer = random1
	}

	answer1.textContent = ansArray[0]
	answer2.textContent = ansArray[1]
	answer3.textContent = ansArray[2]

	for (let i = 0; i < buttons.length; i++) {
		 buttons[i].onclick = ()=>{
			if(buttons[i].id == `antwoord-${correctAnswer}`){
				localStorage.removeItem("correct-answer")
				localStorage.removeItem("answer-array")
				gotoScreen(8)
			} else {
				wrongCount++ //voeg eentje toe aan het aantal keren fout gegokt
				nextScreen()
			}
		}
	}


})

onScreen(7, ()=>{
	let dialogueloc, aftertext
	if(wrongCount === 1) {
		dialogueloc = "dialogue/scherm7.json"
		aftertext = ""
	} else if (wrongCount === 2) {
		dialogueloc = "dialogue/scherm7_tip.json"
		aftertext = quizData["tip"]
	} else {
		dialogueloc = "dialogue/scherm7_fout.json"
		aftertext = `Het juiste antwoord is "${quizData["juist-antwoord"]}"`
	}

	const questionDiv = document.querySelector("#rood-vak h1")
	const amountWrongDiv = document.querySelector("#rood-vak p")

	questionDiv.textContent = quizData["vraag"]
	amountWrongDiv.textContent = `${wrongCount} keer fout`

	createDialogueObject(dialogueloc).then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisje-s7-tekstbubbel"))
		let i = 0
		console.log(i)
		console.log(aftertext)
		setDialogueEndHandler(dialogue,()=>{
			if(aftertext === "" && i === 0){
				gotoScreen(6)
			} else {
				dialogue.textContainer.textContent = aftertext
				dialogue.container.onclick = ()=>{
					dialogue.container.onclick = null //supper hacky lol
					if (wrongCount >= 3){
						console.log("lol")
						localStorage.removeItem("correct-answer")
						localStorage.removeItem("answer-array")
						nextScreen()
					} else {
						gotoScreen(6)
					}
					
				}
				i++
			}
			removeDialogueFromContainer(dialogue)
		})
	})
})

onScreen(8, ()=>{

	for (let i = 0; i < 4; i++) {
		document.getElementById(`code-${i + 1}`).textContent = Math.round(Math.random() * 8) + 1
		
	}

	let gansElement = document.querySelector("#muisje-s8");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("muisje-s8-tekstbubbel"))
			setDialogueEndHandler(dialogue,()=>{
				document.getElementById("code-visibility").classList.remove("invisible");
				dialogue,document.getElementById("muisje-s8-tekstbubbel").onclick = ()=> {nextScreen()}
			})
		})
	})
})

onScreen(9, ()=>{
	setTimeout(nextScreen,3800)

})
onScreen(10, nextScreen) //we skippen dees effe

onScreen(11, ()=>{
	setTimeout(()=>{gotoScreen(14)},1500)
})

onScreen(14, ()=>{
	let gansElement = document.querySelector("#muisje-s14");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject("dialogue/scherm12.json").then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("muisje-s14-tekstbubbel"))
			setDialogueEndHandler(dialogue,()=>{
				makeDialogueInvisible(dialogue)
				removeDialogueFromContainer(dialogue)
				document.getElementById("tekstblok-s14").classList.remove("invisible")
			})
		})
	})

	const img = document.getElementById('kraan-s14')
	const arrow = document.getElementById('schuifpijltje-s14')
	let isDragging = false;
	let initialMousePosition = null;
	let accum = 0;
	let speed = 1; // adjust this value to your needs
	const goal = 400;

	/*
	document.addEventListener('mousemove', (event) => {
		if (isDragging) {
			
		}
	});
	*/
	onDragHandler= () => {
		console.log("uwu")
		const dx = getMTPosition().x - initialMousePosition;
		accum += dx * speed;
		let rotation = (accum / 1400) * 180 / Math.PI;
		img.style.transform = `rotate(${rotation}deg)`;
		arrow.style.left = `calc(${rotation / goal * 100}% - ${Math.min(rotation / goal * 50, 50)}px)`
		
		
		console.log(rotation)

		if (rotation > goal) {
			isDragging = false;
			gotoScreen(13)
		}
	}
})

onScreen(13, ()=>{
	let gansElement = document.querySelector("#muisje-s13");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject("dialogue/scherm13.json").then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("muisje-s13-tekstbubbel"))
			setDialogueEndHandler(dialogue,()=>{
				location.assign(`../../navigate/index.html?locationID=${quizData["mapLocationID"]}`)
			})
		})
	})
})

docReady(async ()=>{
	const fetched = await fetch("../../../data/vault_data.json")
	const vaultData = await fetched.json()
	const locationID = getQueryParam("id")

	//prevent booboos
	localStorage.removeItem("correct-answer")
	localStorage.removeItem("answer-array")

	//console.log(vaultData)
	quizData = vaultData[locationID]
	//console.log(quizData)
	if (quizData === undefined) {
		console.error(`invalid vault id ${locationID}`)
	}
	gotoScreen(1)
})
