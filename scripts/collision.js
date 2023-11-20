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