function endHandler(dialogue) {
	console.log("activated")

	removeDialogueFromContainer(dialogue)

	let dlContainer = document.getElementById("dialogue-container")
	let dlText = document.getElementById("dialogue-text")
	dialogue.container.removeEventListener("click", endHandler)

	createDialogueObject("dialogue_test_2.json").then((dialogue2) => {
		assignDialogueToContainer(dialogue2,dlContainer,dlText)
	})
}


//we creëeren een object en wachten tot deze klaar is.
createDialogueObject("dialogue_data.json").then((dialogue) => {
	let dlContainer = document.getElementById("dialogue-container")
	let dlText = document.getElementById("dialogue-text")

	//deze code gebeurt vanaf dat ons dialogue object geladen is.
	console.log(dialogue)
	//link de container aan de dialogue
	assignDialogueToContainer(dialogue,dlContainer,dlText)

	//zet het dialoog op zichtbaar
	dlContainer.classList.remove("invisible")

	//het eind protocol is om een tweede dialoog venster te openen
	setDialogueEndHandler(dialogue, endHandler)
})
