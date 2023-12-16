 onScreen(1, ()=>{
	setTimeout(nextScreen,3000)
})

onScreen(2, ()=>{
	setTimeout(nextScreen,800)
})

onScreen(3, ()=>{
	createDialogueObject("dialogue/scherm3.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s3"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

onScreen(4, ()=>{
	createDialogueObject("dialogue/scherm4.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s4"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})

let gameDragging = null
const mouseTracker = document.getElementById("mousetracker-s5")
const flower1 = document.getElementById("bloemspel-1-s5")
const flower1T = flower1.style.top
const flower1L = flower1.style.left
const flower2 = document.getElementById("bloemspel-2-s5")
const flower2T = flower2.style.top
const flower2L = flower2.style.left
const flower3 = document.getElementById("bloemspel-3-s5")
const flower3T = flower3.style.top
const flower3L = flower3.style.left

const maxTimeInMinutes = 1 //make dynamic!!
const maxTimeInSeconds = maxTimeInMinutes * 60
let time = maxTimeInSeconds

function timer(){
	let timerDiv = document.getElementById("timer-s5")

	if(time > 0) {
		time--
	}

	if(time < 10) {
		timerDiv.textContent = `${time}`
	}else{
		timerDiv.textContent = `${Math.floor(time/60)}:${time % 60}`
	}

	clearInterval(timer)
}

const fountain = document.getElementById("fontijn-s5")

function flowerBehaviour(flower, flowerT, flowerL){

	if(overlaps(mouseTracker, flower) && __DRAGGING){
		if(gameDragging != flower && gameDragging != null) {return}
		flower.style.top = `${getMTPosition().y}px`
		flower.style.left = `${getMTPosition().x}px`
		gameDragging = flower
	}else{
		if(overlaps(flower, fountain)){
			flower.style.display = "none"
			console.log("disabled")
		}
		flower.style.top = flowerT
		flower.style.left = flowerL
		gameDragging = null
	}
}

function gameLoop(){
	mouseTracker.style.left = `${getMTPosition().x}px`
	mouseTracker.style.top = `${getMTPosition().y}px`
	flowerBehaviour(flower1, flower1T, flower1L)
	flowerBehaviour(flower2, flower2T, flower2L)
	flowerBehaviour(flower3, flower3T, flower3L)


	requestAnimationFrame(gameLoop)
}

onScreen(5, ()=>{
	time = maxTimeInSeconds
	setInterval(timer, 1000)
	gameLoop()
})
onScreen(6,nextScreen)
onScreen(7, nextScreen)
onScreen(8, ()=>{
	createDialogueObject("dialogue/scherm8.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s8"))
		setDialogueEndHandler(dialogue,()=>{
			nextScreen()
		})
	})
})
onScreen(9, nextScreen)
onScreen(10, ()=>{
	createDialogueObject("dialogue/scherm10.json").then((dialogue)=>{
		assignDialogueToContainer(dialogue,document.getElementById("muisjetekst-s10"))
		setDialogueEndHandler(dialogue,()=>{
			console.log("Door jullie is de stad terug groen!! Dankjewel om mij te helpen!! ")
		})
	})
})

docReady(async ()=>{
	gotoScreen(1)
})
gotoScreen(10)
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const maxDiameter = 200; // Max size of the circle
    let objects = [];
    let intervalId;


    function addObject() {
        const diameter = Math.random() * (maxDiameter - 10) + 10; // Random diameter between 10 and maxDiameter
        const obj = {
            width: diameter,
            height: diameter,
            x: Math.random() * (container.offsetWidth - diameter), // Random x position
            y: 0
        };

        placeObject(obj);

        objects.push(obj);
        renderObject(obj);

        if (obj.y + obj.height >= container.offsetHeight) {
            setTimeout(onFull, 500); // Delay for the last animation to complete
        }
    }

    function placeObject(newObj) {
        let minY = 0;
        let allX = Array.from({length: container.offsetWidth - newObj.width}, (_, i) => i);
        
        // Shuffle the X positions
        allX.sort(() => Math.random() - 0.5);

        for (let x of allX) {
            let maxYAtX = 0;

            for (let other of objects) {
                if (checkOverlap(newObj, other, x)) {
                    maxYAtX = Math.max(maxYAtX, other.y + other.height);
                }
            }

            if (maxYAtX < minY || minY === 0) {
                minY = maxYAtX;
                newObj.x = x;
            }
        }

        newObj.y = minY;
    }

    function checkOverlap(objA, objB, x) {
        let aLeft = x;
        let aRight = x + objA.width;
        let bLeft = objB.x;
        let bRight = objB.x + objB.width;

        return !(aRight <= bLeft || aLeft >= bRight);
    }

	function renderObject(obj) {
		const img = document.createElement('img');
		img.className = 'object';
		img.style.width = `${obj.width}px`;
		img.style.height = `${obj.height}px`;
		img.style.left = `${obj.x}px`;
		img.style.bottom = `${obj.y}px`;
		container.style.position = 'absolute'; // Make sure the image is positioned correctly
		container.style.zIndex = '1'; // Set a lower z-index
		img.src = '../../../media/prop/prop_boompjegroot.svg'; // Replace with the actual path to your SVG file
		container.appendChild(img);
	}

    function onFull() {
        clearInterval(intervalId); // Stop adding more objects
    }

    intervalId = setInterval(addObject, 600);
});