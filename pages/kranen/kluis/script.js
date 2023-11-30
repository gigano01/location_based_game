//SCHERM 1
//TODO MAAK DIT DYNAMISCH
let firstdialogue = "dialogue/dialogue01.json"
createDialogueObject(firstdialogue).then((dialogue)=>{
	assignDialogueToContainer(dialogue,document.getElementById("muisje-s1-tekstbubbel"))
	setDialogueEndHandler(dialogue,()=>{
		nextScreen()
	})
})

//SCHERM 2
onScreen(2, ()=>{
	setTimeout(nextScreen, 1200)
})

//SCHERM 3
onScreen(3, ()=>{
	setTimeout(nextScreen, 1200)
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
	createDialogueObject("dialogue/scherm5.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisje-s5-tekstbubbel"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
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

gotoScreen(11)