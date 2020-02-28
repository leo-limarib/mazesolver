const MAP_WIDTH = 800;
const MAP_HEIGHT = 800;

const TILE_SIZE = 25;

var mapTiles = new Array(MAP_WIDTH/TILE_SIZE);

//Tile = 0 --> Chão vazio
//Tile = 1 --> Parede simples

function setup() {
  createCanvas(MAP_WIDTH, MAP_HEIGHT);
  for (let i = 0; i < mapTiles.length; i++) {
  	mapTiles[i] = new Array(MAP_HEIGHT/TILE_SIZE);
  }

  for (let x = 0; x < mapTiles.length; x++) {
  	for (let y = 0; y < mapTiles[0].length; y++) {
  		mapTiles[x][y] = 0;
  	}
  }

  //TESTING
  mapTiles[1][1] = 1;
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
			}
		})
	});
}

function checkTileHover() {
	tileX = Math.ceil(mouseX/TILE_SIZE);
	tileY = Math.ceil(mouseY/TILE_SIZE);
	if(tileX < mapTiles.length && tileY < mapTiles[0].length) {
		fill(255, 0, 0);
		stroke('red');
		rect((tileX-1)*TILE_SIZE, (tileY-1)*TILE_SIZE, TILE_SIZE, TILE_SIZE)
	}
}

function mouseClicked() {
	if(mouseX < MAP_WIDTH && mouseY < MAP_HEIGHT) {
		let x = Math.ceil(mouseX/TILE_SIZE);
		let y = Math.ceil(mouseY/TILE_SIZE);
		mapTiles[x-1][y-1] = 1;
	}
}

function draw() {
  clear();
  renderTileMap();
  checkTileHover();
}