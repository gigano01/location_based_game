 onScreen(1, ()=>{
	document.getElementById("startbutton-s1").onclick = ()=>{
		nextScreen()
	}
})

onScreen(2, ()=>{
	const video = document.getElementById("start-video-s2")
	video.play()
	video.onended = (event) => {
		nextScreen()
	};
})

onScreen(3, ()=>{
	setTimeout(()=>{
		// const nextlocID = "begijnhof-01"
		// location.assign(`../navigate/index.html?locationID=${nextlocID}`)
		nextScreen()
	},3000)
})

docReady(async ()=>{
	localStorage.setItem("score-global", 0)
	gotoScreen(1)
}) 
