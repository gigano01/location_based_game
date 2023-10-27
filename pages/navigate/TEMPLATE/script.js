const startButton = document.querySelector('#start-button');

startButton.onclick = () => {
  const locationID = "test"
  location.assign(`../navigate/index.html?locationID=${locationID}`)
}