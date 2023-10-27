//laad ze, maar weet dat de controle wordt overgedragen aan de dialogue manager
let dialogueContainer = document.getElementById("dialogue-container")
let dialogueText = document.getElementById("dialogue-text")

//dit creëert een nieuw dialoguemanager, deze neemt de volledige controle over van de twee elementen.
newDialogue("dialogue_data.json",dialogueContainer,dialogueText)