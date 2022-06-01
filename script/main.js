// we always start with a module to encapsulate our own code
// it is called an IIFE (Immediately - Invoked Function Expression)

(() => {
	// collect All of the elements that we want the user to interact with and also elements that to change
	// JS holds these in memory so that it can access them later (these are eleementss in the HTML)
	let theThumbnails = document.querySelectorAll("#buttonHolder img"),
		gameBoard = document.querySelector(".puzzle-board"),
		pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
		dropZones = document.querySelectorAll(".drop-zone");

	/* the Thumbails collects all of the image elements into an array-like container that looks like this:
	[
		<img src="images/buttonZero.jpg" alt="thumbnail">
		<img src="images/buttonOne.jpg" alt="thumbnail">
		<img src="images/buttonTwo.jpg" alt="thumbnail">
		<img src="images/buttonThree.jpg" alt="thumbnail">
	]*/

	// .gameBoard {
	// 	background-image: URL("../images/backGround0.jps)")
	// }

	function changeBgImg() {
		// the "this" keyword refers to the element that triggers this function (the nav button we click with the custom data attribute of bgref)
		// debugger;
		// update the background image thumb pieces
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;
	}

	function allowDrag(event) {
		console.log("started draggin me");

		//create a reference to the element we are dragging so we can retrieve it later.
		event.dataTransfer.setData("draggedEl", this.id);
	}

	function allowDragOver(event) {
		// override default behaviour on certain elements when an event happens
		event.preventDefault();
		console.log("started draggin over me");
	}

	function allowDrop(event) {
		event.preventDefault();
		console.log("dropped on me");

		let droppedElId = event.dataTransfer.getData("draggedEl");

		//retrieve the dragged el by its ID, and then put it inside the current drop zone
		this.appendChild(document.querySelector(`#${droppedElId}`));
	}

	// how to we want the user to interact with the elements that we collected earlier?
	// events are things like clicks, drags, double-clickss, keypresses... all the ways that a user can interact with a mouse, a keyboard etc.
	// add event handling here => loopthrough theThumbnails array and add event handling to each image
	theThumbnails.forEach(item => item.addEventListener("click", changeBgImg));
	pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));
	
	//set up the drop zone event handling
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", allowDragOver);
		zone.addEventListener("drop", allowDrop);
	});
	
})();
