function makeDialogueInvisible(dialogue){
	dialogue.container.classList.add("invisible")
}

function setDialogueEndHandler(dialogue, handler) {
	if (typeof handler !== "function") {
		console.error("de gegeven endhandler is niet van type functie, er werden geen wijzegingen aangebracht.")
	}else{
		dialogue.endHandler = handler
	}
}

function __dialogueClickAction(){}

function assignDialogueToContainer(dialogue, container, textContainer) {
	container.classList.remove("invisible")
	dialogue.container = container
	if(textContainer != null) {
		dialogue.textContainer = textContainer
	}else{
		dialogue.textContainer = container.getElementsByClassName("spraak-bubbel-text")[0]
	}
	
	
	dialogue.textContainer.textContent = dialogue.prompts[dialogue.promptNumber].text

	function __dialogueClickAction() {
		if(dialogue.textContainer != undefined) {
			
			if (dialogue.promptNumber < dialogue.count-1) {
				dialogue.promptNumber++
				dialogue.textContainer.textContent = dialogue.prompts[dialogue.promptNumber].text
			}else{
				dialogue.textContainer.textContent = ""
				dialogue.endHandler(dialogue)
			}
			
		}
	}

	container.addEventListener("click", __dialogueClickAction)
	dialogue.clickaction = __dialogueClickAction
}
function removeDialogueFromContainer(dialogue){
	dialogue.container.removeEventListener("click", dialogue.clickaction)
}

/*
function findDialogueMaximum(dialogue){
	const fontSize = dialogue.get
}
*/

async function createDialogueObject(jsonLocation){
	const fetched = await fetch(jsonLocation)
	const data = await fetched.json()
	let dialogue = {
		"promptNumber": 0,
		"count": data.count,
		"prompts": data.prompts,
		"endHandler": ()=>{console.warn("an end handler was not set")}
	}
	return dialogue
}