onScreen(1,()=>{
	setTimeout(nextScreen, 2000)
})

onScreen(2, ()=>{
	createDialogueObject("dialogue/scherm2.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s2"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

 let timerID = null
 let stopid = null
 const maxTimeInMinutes = 0.75 //make dynamic!!
 const maxTimeInSeconds = maxTimeInMinutes * 60
 let time = maxTimeInSeconds

 let inTime = false

function timer(){
	const timerDiv = document.getElementById("timer-s3")

	if(time > 0) {
		time--
	} else {
		clearInterval(timerID)
		clearInterval(stopid)
		nextScreen()
	}

	if(time < 10) {
		timerDiv.textContent = `${time}`
	}else{
		timerDiv.textContent = `${Math.floor(time/60)}:${time % 60}`
	}

	//clearInterval(timer)
}

onScreen(3,()=>{
	// setTimeout(nextScreen, 1000)
	// This function will be called when you're within 10 meters of your target location

	// Define your target location
	const targetLocation = {
		latitude: 51.2175951774842,
		longitude:  4.410341081792486
  	}
	function onArrival() {
		inTime = true
		nextScreen()
		clearInterval(stopid)
	}
	
	stopid = setInterval(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords
			const distance = getDistance(latitude, longitude, targetLocation.latitude, targetLocation.longitude).distance
		
			console.log(`Distance to target: ${distance} meters`)
			document.getElementById("afstand-s3").textContent = `${distance}m`
		
			if (distance <= 12) {
				onArrival();
			}
		})
  }, 1000)

  timerID = setInterval(timer, 1000)
})

onScreen(4, ()=>{
	// createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
	// 	assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s4"))
	// 	setDialogueEndHandler(dialogue,()=>{
	// 		const nextlocID = "theaterplein-01"
	// 		location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
	// 	})
	// })

	
	//KOM HIER OP TERUG888
	const score = (inTime) ? 3 : 1 // als je op tijd bent dan krijge je er 3, anders 1.
	showReward(score)
	document.getElementById("scherm-4").onclick = ()=> {
		const nextlocID = "theaterplein-01"
		location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
	}
})

docReady(async ()=>{
	gotoScreen(1)
})


