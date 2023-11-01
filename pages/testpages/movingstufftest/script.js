const startButton = document.querySelector('#start-button')

let vierkant = document.getElementById("test-object")
let vallendVierkant = document.getElementById("vallend-object")

//source https://stackoverflow.com/questions/9768291/check-collision-between-certain-divs#:~:text=a%20%26%20b%20are-,HTMLElements,-function%20overlaps(
function overlaps(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  const isInHoriztonalBounds =
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  const isInVerticalBounds =
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
}

//javascript is heel raar met dit soort dingen, maar dit is hoe je het doet bewegen.
document.addEventListener('touchmove', function(e) {
    e.preventDefault()
    let touch = e.touches[0]
    vierkant.style.left = touch.pageX-50 + 'px'
    vierkant.style.top = touch.pageY-50 + 'px'
}, false)

//en dit is voor het op de computer te laten werken.
document.addEventListener('mousemove', (event) => {
  //console.log(`mouse position: ${event.x}:${event.y}`);

  vierkant.style.left = `${event.x-50}px`
  vierkant.style.top = `${event.y-50}px`
})

//VALLEND OBJECT TEST
let x,y = 0
setInterval(() => {
  
  let height = window.innerHeight
  let width = window.innerWidth

  y += 5

  if (y > height) {
    y = -100
    x = Math.random() * (width-100)
  }
  console.log(x)

  //zet de x en y waarden
  vallendVierkant.style.left = x + "px"
  vallendVierkant.style.top = y + "px"


  //als de twee divs op elkaar vallen dan willen we de kleur veranderen.
  if (overlaps(vierkant, vallendVierkant)) {
    vallendVierkant.style.backgroundColor = "rgb(174, 8, 8)"
  } else {
    vallendVierkant.style.backgroundColor = "rgb(45, 145, 5)";
  }
},20)

