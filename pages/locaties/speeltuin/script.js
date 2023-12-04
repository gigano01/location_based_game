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

onScreen(5,nextScreen)

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