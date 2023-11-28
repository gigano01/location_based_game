let textBox = document.getElementById("bubbel")
let vault = document.getElementById("kluis")
let mouse = document.getElementById("muisje")

async function onEnd() {
	textBox.classList.add("invisible")
	vault.classList.add("zoomin-op-numpad")
	mouse.classList.add("verlaatscherm")

}

createDialogueObject("dialogue01.json").then((dialogue)=>{
	textBox.classList.remove("invisible")
	assignDialogueToContainer(dialogue,textBox)
	setDialogueEndHandler(dialogue, onEnd)
})