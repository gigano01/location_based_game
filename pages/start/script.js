onScreen(1, ()=>{
	document.getElementById("startbutton-s1").onclick = ()=>{
		nextScreen()
	}
})

onScreen(2, ()=>{
	setTimeout(nextScreen,3000)
})

onScreen(3, ()=>{
	setTimeout(()=>{
		const nextlocID = "begijnhof-01"
		location.assign(`../navigate/index.html?locationID=${nextlocID}`)
	},3000)
})

docReady(async ()=>{
	gotoScreen(1)
})