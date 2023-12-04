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

onScreen(4, ()=>{
	document.getElementById("indienen-s4").onclick = nextScreen
})

onScreen(5, ()=>{

	createDialogueObject("dialogue/scherm5_succes.json").then((dialogue)=>{
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
			const nextlocID = ""
			location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
		})
	})
})

docReady(async ()=>{
	gotoScreen(1)
})