(() => {
	console.log('Welcome to the Puzzle Pieces Game');

	let theThumbnails = document.querySelectorAll("#buttonHolder img"),

		gameBoard = document.querySelector(".puzzle-board"),
		pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
		dropZones = document.querySelectorAll(".drop-zone");
		puzzleBoard = document.querySelector(".puzzle-pieces");

	function changeImageSet() {
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;
	
		// 2º Bug - reset puzzle pieces when click in the Thumbnails //
		dropZones.forEach(item => {item.innerHTML = ""});
		
		puzzleBoard.innerHTML = "";
		pzlPieces[0].src = `images/topLeft${this.dataset.bgref}.jpg`;
		pzlPieces[1].src = `images/topRight${this.dataset.bgref}.jpg`;
		pzlPieces[2].src = `images/bottomLeft${this.dataset.bgref}.jpg`;
		pzlPieces[3].src = `images/bottomRight${this.dataset.bgref}.jpg`;
		pzlPieces.forEach(item => puzzleBoard.appendChild(item));
		
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

	theThumbnails.forEach(item =>
		item.addEventListener("click", changeImageSet));
		
		

	pzlPieces.forEach(piece => 
		piece.addEventListener('dragstart', allowDrag));
	
	//set up the drop zone event handling
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", allowDragOver);
		zone.addEventListener("drop", allowDrop);
	});
	
	changeImageSet.call(theThumbnails[0]); // emulates a click on the first bottom button

})();