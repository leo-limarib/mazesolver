const MAP_WIDTH = 800;
const MAP_HEIGHT = 800;

const SIDE_BAR_WIDTH = 300;

const TILE_SIZE = 25;

//Tile = 0 --> Chão vazio
//Tile = 1 --> Parede simples
var mapTiles = new Array(MAP_WIDTH/TILE_SIZE);

//Edit mode = 0 --> Null cursor mode
//Edit mode = 1 --> Colocar paredes
//Edit mode = 2 --> Colocar waypoint
//Edit mode = 3 --> Colocar robô
var editMode = 0;

var playerPosition = [null, null];

function wallMode() {
	editMode = 1;
}

function waypointMode() {
	editMode = 2;
}

function createEditModeButtons() {
	wallButton = createButton('Colocar paredes.');
	wallButton.position(900, 20);
	wallButton.mousePressed(wallMode);

	waypointButton = createButton('Colocar waypoints.');
	waypointButton.position(894, 60);
	waypointButton.mousePressed(waypointMode);
}

function setup() {
  createCanvas(MAP_WIDTH+SIDE_BAR_WIDTH, MAP_HEIGHT);
  for (let i = 0; i < mapTiles.length; i++) {
  	mapTiles[i] = new Array(MAP_HEIGHT/TILE_SIZE);
  }

  for (let x = 0; x < mapTiles.length; x++) {
  	for (let y = 0; y < mapTiles[0].length; y++) {
  		mapTiles[x][y] = 0;
  	}
  }

  createEditModeButtons();
}

function renderSideBar() {
	fill(0, 0, 0);
	rect(MAP_WIDTH, 0, SIDE_BAR_WIDTH, MAP_HEIGHT);
}

function renderTileMap() {
	mapTiles.forEach((tileLine, indexX) => {
		tileLine.forEach((tile, indexY) => {
			if(tile == 0) {
				stroke('black');
				fill(255, 255, 255);
				rect(indexX * TILE_SIZE, indexY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
			} else if (tile == 1) {
				stroke('red');
				fill(255, 0, 0);
				rect(indexX * TILE_SIZE, indexY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
			} else if (tile == 2) {
				stroke('green');
				fill(0, 255, 0);
				rect(indexX * TILE_SIZE, indexY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
		})
	});
}

function checkTileHover() {
	if(editMode === 1) {
		tileX = Math.ceil(mouseX/TILE_SIZE);
		tileY = Math.ceil(mouseY/TILE_SIZE);
		if(tileX < mapTiles.length && tileY < mapTiles[0].length) {
			fill(255, 0, 0);
			stroke('red');
			rect((tileX-1)*TILE_SIZE, (tileY-1)*TILE_SIZE, TILE_SIZE, TILE_SIZE);
		}
	} else if (editMode === 2) {
		tileX = Math.ceil(mouseX/TILE_SIZE);
		tileY = Math.ceil(mouseY/TILE_SIZE);
		if(tileX < mapTiles.length && tileY < mapTiles[0].length) {
			fill(0, 255, 0);
			stroke('green');
			rect((tileX-1)*TILE_SIZE, (tileY-1)*TILE_SIZE, TILE_SIZE, TILE_SIZE);
		}
	}
}

function mouseClicked() {
	if(mouseButton === LEFT) {
		if(editMode === 1) {
			if(mouseX < MAP_WIDTH && mouseY < MAP_HEIGHT) {
				let x = Math.ceil(mouseX/TILE_SIZE);
				let y = Math.ceil(mouseY/TILE_SIZE);
				mapTiles[x-1][y-1] = 1;
			}
		} else if(editMode === 2) {
			if(mouseX < MAP_WIDTH && mouseY < MAP_HEIGHT) {
				let x = Math.ceil(mouseX/TILE_SIZE);
				let y = Math.ceil(mouseY/TILE_SIZE);
				mapTiles[x-1][y-1] = 2;
			}
		}
	}
}

function keyPressed() {
	//D = empty/delete tile
	if(keyCode == 68) {
		if(mouseX < MAP_WIDTH && mouseY < MAP_HEIGHT) {
			let x = Math.ceil(mouseX/TILE_SIZE);
			let y = Math.ceil(mouseY/TILE_SIZE);
			mapTiles[x-1][y-1] = 0;
		}
	}
}

function draw() {
  clear();
  renderTileMap();
  checkTileHover();
  renderSideBar();
}