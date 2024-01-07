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
 	setTimeout(nextScreen,2800)
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
const canvas = document.getElementById("vlak-2-s5")
const prompt_text = document.getElementById("vlak-s5")

const prompts = ["Lavendel, Lamiaceae", "Emerald 'N Gold, Celastraceae", "Bosviooltje, Violacceae"]
let offset = 1

//WE SKIPPEN HET SPEL EFFE
onScreen(5, ()=>{
	prompt_text.textContent = prompts[offset - 1]
	function callback(base64) {
		canvas.style.display = "block";

		console.log('the image was captured')
		console.log(base64)
		if(Math.random() * 10 > 3 && !firstTime){
			setTimeout(nextScreen,800)
			console.log("epic")
			prompt_text.textContent = prompts[offset - 1]
			prompt_text.style.backgroundColor = "var(--groen)"
		} else {
			firstTime = false
			console.log("not epic")
			prompt_text.textContent = "Probeer opnieuw"
			prompt_text.style.backgroundColor = "var(--eye-bleed-red)"
			setTimeout(()=>{
				canvas.style.display = "none"
				prompt_text.textContent = prompts[offset - 1]
				prompt_text.style.backgroundColor = "var(--groen)"
			},800)
		}
	  }

	  document.getElementById("fotobutton-s5").onclick = nextScreen
	  
	  startCamera(true, '#video', '#vlak-2-s5', '#fotobutton-s5', callback);


})
onScreen(6, ()=>{
	canvas.style.display = "none"
	offset++
	if (offset > 3) {
		gotoScreen(7)
	}else {
		setTimeout(()=>{gotoScreen(5)}, 1200)
	}
})
onScreen(7, ()=>{
	setTimeout(nextScreen, 4000)
})

onScreen(8, ()=>{
	let gansElement = document.querySelector("#uil-s8");
    gansElement.addEventListener('animationend', () => {
		createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
			assignDialogueToContainer(dialogue,document.getElementById("uiltekst-s8"))
			setDialogueEndHandler(dialogue,()=>{
				const nextlocID = "speeltuin-01"
				location.assign(`../../navigate/index.html?locationID=${nextlocID}`)
			})
		})
	})
})


docReady(async ()=>{
	gotoScreen(1)
})

