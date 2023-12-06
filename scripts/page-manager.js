let __pageI = 1
let __amountOfPages = 0
let __onScreenEventHandlers = []

function onScreen(pgnumber, handler) {
	__onScreenEventHandlers[pgnumber] = handler
}

function callForScreenEventHandler() {
	if (typeof __onScreenEventHandlers[__pageI] === "function") {
		__onScreenEventHandlers[__pageI]()
	}
}

function getScreenNumber() {
	return __pageI
}

function findScreenNumber() {
	if (__amountOfPages === 0) {
		let found = false
		let i = 1
		while (!found) {
			if (document.getElementById(`scherm-${i}`) === null) {
				__amountOfPages = i - 1
				console.log(`this page has ${i-1} screens`)
				return
			}
			i++
		}
	}
}

function nextScreen() {
	if (__pageI+1 > __amountOfPages) {
		console.error(`Er is geen volgende scherm na ID ${__pageI}`)
		return
	}
	__pageI++

	for (let i = 1; i<__amountOfPages; i++) {
		document.getElementById(`scherm-${i}`).classList.add("invisible")
	}
	document.getElementById(`scherm-${__pageI}`).classList.remove("invisible")
	console.log(`we zijn nu op scherm ${__pageI}`)
	callForScreenEventHandler()
}

function gotoScreen(screenID) {
	//findScreenNumber()
	 let schermDiv = document.getElementById(`scherm-${screenID}`)
	 if (schermDiv != null) {
		 for (let i = 1; i<=__amountOfPages; i++) {
			 document.getElementById(`scherm-${i}`).classList.add("invisible")
		 }
		 schermDiv.classList.remove("invisible")
		 __pageI = screenID
		 console.log(`we zijn nu op scherm ${__pageI}`) 
		 callForScreenEventHandler()
	 } else {
		console.error(`Scherm met ID ${screenID} bestaat niet.`)
	 }
}

findScreenNumber()