onScreen(1, ()=>{
	setTimeout(nextScreen,3000)
})

onScreen(2, ()=>{
	let gansElement = document.querySelector("#muis-s2");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject("dialogue/scherm2.json").then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("muistekst-s2"))
			setDialogueEndHandler(dialogue,()=>{
				nextScreen()
			})
		})
	})
})

 onScreen(3, ()=>{
 	setTimeout(nextScreen,800)
})

onScreen(4, ()=>{
	let gansElement = document.querySelector("#uil-s4");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("uiltekst-s4"))
			setDialogueEndHandler(dialogue,()=>{
				nextScreen()
			})
		})
	})
})

let firstTime = true

//WE SKIPPEN HET SPEL EFFE
onScreen(5, ()=>{
	
	function callback(base64) {
		console.log('the image was captured')
		console.log(base64)
		if(Math.random() * 10 > 4 && !firstTime){
			setTimeout(nextScreen,800)
			console.log("epic")
		} else {
			firstTime = false
			console.log("not epic")
		}
	  }

	  document.getElementById("capture").onclick = nextScreen
	  
	  startCamera(false, '#video', '#canvas', '#capture', callback);


})
onScreen(6, ()=>{
	setTimeout(nextScreen, 1200)
})
onScreen(7, ()=>{
	setTimeout(nextScreen, 1200)
})

onScreen(8, ()=>{
	createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("uiltekst-s8"))
		setDialogueEndHandler(dialogue,()=>{
			const nextlocID = "speeltuin-01"
			location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
		})
	})
})


docReady(async ()=>{
	gotoScreen(1)
})

