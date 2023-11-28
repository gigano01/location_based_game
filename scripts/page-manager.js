let __pageI = 1
let __amountOfPages = 1

function setPageCount(x) {
	__amountOfPages = x
}

function nextScreen() {
	__pageI++
	for (let i = 1; i<__amountOfPages; i++) {
		document.getElementById(`scherm-${i}`).classList.add("invisible")
	}
	document.getElementById(`scherm-${__pageI}`).classList.remove("invisible")
}

function gotoScreen(screenID) {
	for (let i = 1; i<=__amountOfPages; i++) {
		document.getElementById(`scherm-${i}`).classList.add("invisible")
	}
	document.getElementById(`scherm-${screenID}`).classList.remove("invisible")
	__pageI = screenID
}