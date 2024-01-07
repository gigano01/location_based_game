function showReward(count){
	switch (count) {
		case 1:
			document.getElementsByClassName("eenboom")[0].classList.remove("invisible")
			break;
		case 2:
			document.getElementsByClassName("tweebomen")[0].classList.remove("invisible")
			break
		default:
		case 3:
			document.getElementsByClassName("driebomen")[0].classList.remove("invisible")
	}

	const currentScore = localStorage.getItem("score-global")
	localStorage.setItem("score-global",currentScore + count)
}

