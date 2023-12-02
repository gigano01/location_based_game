onScreen(1,()=>{
	setTimeout(nextScreen, 1000)
})

onScreen(2, ()=>{
	createDialogueObject("dialogue/scherm2.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s2"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(3,()=>{
	setTimeout(nextScreen, 1000)
})

onScreen(4, ()=>{
	createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s4"))
		setDialogueEndHandler(dialogue,()=>{
			const nextlocID = ""
			location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
		})
	})
})

docReady(async ()=>{
	gotoScreen(4)
})