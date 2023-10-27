//Dialogue engine
//wordt gebruikt voor het maken van dialogue
function DialogueGetNextPrompt(dialogue) {
    dialogue.promptNumber++
    console.log(dialogue)

    if (dialogue.data.count < dialogue.promptNumber) {
        return ""
    }
    return dialogue.data.prompts[dialogue.promptNumber].text
}

function DialogueSetInitialValue(dialogue) {
    dialogueText.textContent = dialogue.data.prompts[dialogue.promptNumber].text
    dialogueContainer.classList.remove("invisible")
}

function DialogueOnPress(dialogue) {
    dialogueText.textContent = DialogueGetNextPrompt(dialogue)
}

//creëert een nieuw dialoog venster
async function newDialogue(dataFile, dialogueContainer,dialogueText) {
    const fetched = await fetch(dataFile);
    const data = await fetched.json()
    console.log(data)

    //we maken een dialogue object met alle functies
    let dialogue = {
        data,
        "promptNumber": 0,
        "onPress": DialogueOnPress
    }

    
    dialogueContainer.addEventListener('click', () => {
        dialogue.onPress(dialogue)
    })
    DialogueSetInitialValue(dialogue)

    return dialogue
}