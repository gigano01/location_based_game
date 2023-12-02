onScreen(1, ()=>{
	setTimeout(nextScreen,3000)
})

onScreen(2, ()=>{
	createDialogueObject("dialogue/scherm2.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muistekst-s2"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(3, ()=>{
	//TODO animatie :D
	setTimeout(nextScreen,800)
})

onScreen(4, ()=>{
	createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("uiltekst-s4"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

//WE SKIPPEN HET SPEL EFFE
onScreen(5, nextScreen)
onScreen(6, nextScreen)
onScreen(7, nextScreen)

onScreen(8, ()=>{
	createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("uiltekst-s8"))
		setDialogueEndHandler(dialogue,()=>{
			const nextlocID = ""
			location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
		})
	})
})


docReady(async ()=>{
	gotoScreen(1)
})