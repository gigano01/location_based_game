let __pageI = 1
let __amountOfPages = 0

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
	//findScreenNumber()
	if (__pageI+1 > __amountOfPages) {
		console.error(`Er is geen volgende scherm na ID ${__pageI}`)
		return
	}
	__pageI++

	for (let i = 1; i<__amountOfPages; i++) {
		document.getElementById(`scherm-${i}`).classList.add("invisible")
	}
	document.getElementById(`scherm-${__pageI}`).classList.remove("invisible")
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
	 } else {
		console.error(`Scherm met ID ${screenID} bestaat niet.`)
	 }
}

findScreenNumber()