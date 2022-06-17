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

	const imageNames = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

	function changeImageSet() {
		// the "this" keyword refers to the element that triggers this function (the nav button we click with the custom data attribute of bgref)
		// debugger;
		// update the background image thumb pieces
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;

		let clickedThumb = this; 

		pzlPieces.forEach((piece, index) => {
			piece.src = `images/${imageNames[index] + clickedThumb.dataset.bgref}.jpg`;
		});
	}

	function allowDrag(event) {
		console.log("started draggin me");

		event.dataTransfer.setData("draggedEl", this.id);
	}

	function allowDragOver(event) {
		
		event.preventDefault();
		console.log("started draggin over me");
	}

	function allowDrop(event) {
		event.preventDefault();
		console.log("dropped on me");

		let droppedElId = event.dataTransfer.getData("draggedEl");

		// 1º Bug - prevents two pieces from dropping in the same box //
		// if this.childElementCount is greater than 0, dont execute anything else. Just exit/return the function.
		if (this.childElementCount > 0){
			return;
		}

		//retrieve the dragged el by its ID, and then put it inside the current drop zone
		this.appendChild(document.querySelector(`#${droppedElId}`));
	}

	theThumbnails.forEach(item => 
		item.addEventListener("click", changeImageSet));
		// item.addEventListener('click', resetPuzzle)

	pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));
	
	//set up the drop zone event handling
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", allowDragOver);
		zone.addEventListener("drop", allowDrop);
	});
	

})();
