let textBox = document.getElementById("bubbel")
let vault = document.getElementById("kluis")
let mouse = document.getElementById("muisje")

setPageCount(2)

async function onEnd() {
	textBox.classList.add("invisible")
	vault.classList.add("zoomin-op-numpad")
	mouse.classList.add("verlaatscherm")

	setTimeout(()=>{
		nextScreen()
	}, 100)
}

createDialogueObject("dialogue01.json").then((dialogue)=>{
	textBox.classList.remove("invisible")
	assignDialogueToContainer(dialogue,textBox)
	setDialogueEndHandler(dialogue, onEnd)
})

document.getElementById("muisje2").onclick = ()=>{
	gotoScreen(1)
}