onScreen(1, ()=>{
	setTimeout(nextScreen,3000)
})

onScreen(2, ()=>{
	setTimeout(nextScreen,800)
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

onScreen(7, ()=>{
	createDialogueObject("dialogue/scherm7.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s7"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(8, ()=>{
	createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("eekhoorntjetekst-s8"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})
docReady(async ()=>{
	gotoScreen(1)
})