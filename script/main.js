(() => {

	let theThumbnails = document.querySelectorAll("#buttonHolder img"),

		gameBoard = document.querySelector(".puzzle-board"),
		pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
		dropZones = document.querySelectorAll(".drop-zone");


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
		console.log("dropped on me");

		let droppedElId = event.dataTransfer.getData("draggedEl");
		
		this.appendChild(document.querySelector(`#${droppedElId}`));
	}

	
	theThumbnails.forEach(item => item.addEventListener("click", changeImageSet));
	pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));
	
	//set up the drop zone event handling
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", allowDragOver);
		zone.addEventListener("drop", allowDrop);
	});
	
})();
