(() => {

	let theThumbnails = document.querySelectorAll("#buttonHolder img"),

		gameBoard = document.querySelector(".puzzle-board"),
		pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
		dropZones = document.querySelectorAll(".drop-zone");
		// zonePieces = document.querySelector('.puzzle-pieces');


	const imageNames = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

	function changeImageSet() {
		
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

		// 1º Bug - prevents two pieces from dropping in the same box //
		if (this.children.length >= 1){

			return;
		}

		console.log("dropped on me");

		let droppedElId = event.dataTransfer.getData("draggedEl");
		
		this.appendChild(document.querySelector(`#${droppedElId}`));
	}

	// function resetPuzzle(){
	// 	for (let loop = 0; loop < puzzlePieces.length; loop = loop + 1){
	// 		zonePieces.appendChild(puzzlePieces[loop]);
	// 	}
	// }
	
	theThumbnails.forEach(item => 
		item.addEventListener("click", changeImageSet));
		// item.addEventListener('click', resetPuzzle)

	pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));
	
	//set up the drop zone event handling
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", allowDragOver);
		zone.addEventListener("drop", allowDrop);
	});
	
	// changeImageSet.call(theThumbnails[0]); // emulates a click on the first bottom button

})();
