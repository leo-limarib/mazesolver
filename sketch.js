const MAP_WIDTH = 800;
const MAP_HEIGHT = 800;
const TILE_SIZE = 25;

const SIDE_BAR_WIDTH = 300;

//Tile = 0 --> Chão vazio
//Tile = 1 --> Parede simples
var mapTiles = new Array(MAP_WIDTH / TILE_SIZE);

//Edit mode = 0 --> Null cursor mode
//Edit mode = 1 --> Colocar paredes
//Edit mode = 2 --> Colocar waypoint
//Edit mode = 3 --> Colocar robô
var editMode = 0;

var finalPosition = null;
var playerPosition = null;
var aPos = null;

function countOpenedNodes() {
  var count = 0;
  mapTiles.forEach((tileLine, indexX) => {
    tileLine.forEach((tile, indexY) => {
      if (tile.type == 0 || tile.type == 2) {
        count += 1;
      }
    });
  });
  return count;
}

function searchNodeWLowestEstimate() {
  var lower = null;
  var count = 0;
  mapTiles.forEach((tileLine, indexX) => {
    tileLine.forEach((tile, indexY) => {
      count += 1;
      if (
        lower == null &&
        tile.estimate != -1 &&
        tile.opened == true &&
        tile.type != 1
      ) {
        aPos = { x: indexX, y: indexY };
        lower = tile.estimate;
      } else if (
        tile.estimate != -1 &&
        tile.estimate < lower &&
        tile.opened == true &&
        tile.type != 1
      ) {
        aPos = { x: indexX, y: indexY };
        lower = tile.estimate;
      }
    });
  });
}

function run() {
  beginDijkstra();
  showPath(finalPosition);
}

function showPath(position) {
  if (position != null) {
    if (
      mapTiles[position[0]][position[1]].type != 3 &&
      mapTiles[position[0]][position[1]].type != 2
    ) {
      mapTiles[position[0]][position[1]].type = 10;
    }
    if (mapTiles[position[0]][position[1]].predecessor != null) {
      showPath([
        mapTiles[position[0]][position[1]].predecessor.x,
        mapTiles[position[0]][position[1]].predecessor.y,
      ]);
    }
  }
}

function beginDijkstra() {
  var openedNodes = countOpenedNodes();
  while (openedNodes > 0) {
    searchNodeWLowestEstimate();
    mapTiles[aPos.x][aPos.y].opened = false;
    openedNodes -= 1;
    if (aPos != null) {
      if (
        aPos.x < mapTiles.length - 1 &&
        mapTiles[aPos.x + 1][aPos.y].estimate == -1 &&
        mapTiles[aPos.x + 1][aPos.y].type != 1
      ) {
        mapTiles[aPos.x + 1][aPos.y].estimate =
          mapTiles[aPos.x][aPos.y].estimate + 1;
        mapTiles[aPos.x + 1][aPos.y].predecessor = {
          x: aPos.x,
          y: aPos.y,
        };
      }

      if (
        aPos.x > 0 &&
        mapTiles[aPos.x - 1][aPos.y].estimate == -1 &&
        mapTiles[aPos.x - 1][aPos.y].type != 1
      ) {
        mapTiles[aPos.x - 1][aPos.y].estimate =
          mapTiles[aPos.x][aPos.y].estimate + 1;
        mapTiles[aPos.x - 1][aPos.y].predecessor = {
          x: aPos.x,
          y: aPos.y,
        };
      }

      if (
        aPos.y < mapTiles.length - 1 &&
        mapTiles[aPos.x][aPos.y + 1].estimate == -1 &&
        mapTiles[aPos.x][aPos.y + 1].type != 1
      ) {
        mapTiles[aPos.x][aPos.y + 1].estimate =
          mapTiles[aPos.x][aPos.y].estimate + 1;
        mapTiles[aPos.x][aPos.y + 1].predecessor = {
          x: aPos.x,
          y: aPos.y,
        };
      }

      if (
        aPos.y > 0 &&
        mapTiles[aPos.x][aPos.y - 1].estimate == -1 &&
        mapTiles[aPos.x][aPos.y - 1].type != 1
      ) {
        mapTiles[aPos.x][aPos.y - 1].estimate =
          mapTiles[aPos.x][aPos.y].estimate + 1;
        mapTiles[aPos.x][aPos.y - 1].predecessor = {
          x: aPos.x,
          y: aPos.y,
        };
      }
      // ------------------------------------------------------- //

      if (
        aPos.x < mapTiles.length - 1 &&
        mapTiles[aPos.x][aPos.y].estimate + 1 <
          mapTiles[aPos.x + 1][aPos.y].estimate &&
        mapTiles[aPos.x + 1][aPos.y].type != 1
      ) {
        mapTiles[aPos.x + 1][aPos.y].estimate =
          mapTiles[aPos.x][aPos.y].estimate + 1;
        mapTiles[aPos.x + 1][aPos.y].predecessor = {
          x: aPos.x,
          y: aPos.y,
        };
      }

      if (
        aPos.x > 0 &&
        mapTiles[aPos.x][aPos.y].estimate + 1 <
          mapTiles[aPos.x - 1][aPos.y].estimate &&
        mapTiles[aPos.x - 1][aPos.y].type != 1
      ) {
        mapTiles[aPos.x - 1][aPos.y].estimate =
          mapTiles[aPos.x][aPos.y].estimate + 1;
        mapTiles[aPos.x - 1][aPos.y].predecessor = {
          x: aPos.x,
          y: aPos.y,
        };
      }

      if (
        aPos.y < mapTiles.length - 1 &&
        mapTiles[aPos.x][aPos.y].estimate + 1 <
          mapTiles[aPos.x][aPos.y + 1].estimate &&
        mapTiles[aPos.x][aPos.y + 1].type != 1
      ) {
        mapTiles[aPos.x][aPos.y + 1].estimate =
          mapTiles[aPos.x][aPos.y].estimate + 1;
        mapTiles[aPos.x][aPos.y + 1].predecessor = {
          x: aPos.x,
          y: aPos.y,
        };
      }

      if (
        aPos.y > 0 &&
        mapTiles[aPos.x][aPos.y].estimate + 1 <
          mapTiles[aPos.x][aPos.y - 1].estimate &&
        mapTiles[aPos.x][aPos.y - 1].type != 1
      ) {
        mapTiles[aPos.x][aPos.y - 1].estimate =
          mapTiles[aPos.x][aPos.y].estimate + 1;
        mapTiles[aPos.x][aPos.y - 1].predecessor = {
          x: aPos.x,
          y: aPos.y,
        };
      }
    }
    //console.log(openedNodes);
  }
  showPath();
}

function wallMode() {
  editMode = 1;
}

function waypointMode() {
  editMode = 2;
}

function playerMode() {
  editMode = 3;
}

function createEditModeButtons() {
  wallButton = createButton("Colocar paredes.");
  wallButton.position(900, 20);
  wallButton.mousePressed(wallMode);

  waypointButton = createButton("Posicionar final.");
  waypointButton.position(894, 60);
  waypointButton.mousePressed(waypointMode);

  playerButton = createButton("Posicionar jogador.");
  playerButton.position(895, 100);
  playerButton.mousePressed(playerMode);

  dijkstraButton = createButton("Começar!");
  dijkstraButton.position(900, 140);
  dijkstraButton.mousePressed(run);
}

//Estimate = -1 --> Estimativa infinita
function createTile(predecessor, estimate, type) {
  return {
    predecessor: predecessor,
    estimate: estimate,
    opened: true,
    type: type,
  };
}

function setup() {
  createCanvas(MAP_WIDTH + SIDE_BAR_WIDTH, MAP_HEIGHT);
  for (let i = 0; i < mapTiles.length; i++) {
    mapTiles[i] = new Array(MAP_HEIGHT / TILE_SIZE);
  }

  for (let x = 0; x < mapTiles.length; x++) {
    for (let y = 0; y < mapTiles[0].length; y++) {
      mapTiles[x][y] = createTile(null, -1, 0);
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
      if (tile.type == 0) {
        stroke("black");
        fill(255, 255, 255);
        rect(indexX * TILE_SIZE, indexY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      } else if (tile.type == 1) {
        stroke("red");
        fill(255, 0, 0);
        rect(indexX * TILE_SIZE, indexY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      } else if (tile.type == 2) {
        stroke("green");
        fill(0, 255, 0);
        rect(indexX * TILE_SIZE, indexY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      } else if (tile.type == 3) {
        stroke("blue");
        fill(0, 0, 255);
        rect(indexX * TILE_SIZE, indexY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      } else if (tile.type == 10) {
        stroke("green");
        fill(255, 255, 255);
        rect(indexX * TILE_SIZE, indexY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    });
  });
}

function checkTileHover() {
  if (editMode === 1) {
    tileX = Math.ceil(mouseX / TILE_SIZE);
    tileY = Math.ceil(mouseY / TILE_SIZE);
    if (tileX < mapTiles.length && tileY < mapTiles[0].length) {
      fill(255, 0, 0);
      stroke("red");
      rect(
        (tileX - 1) * TILE_SIZE,
        (tileY - 1) * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  } else if (editMode === 2) {
    tileX = Math.ceil(mouseX / TILE_SIZE);
    tileY = Math.ceil(mouseY / TILE_SIZE);
    if (tileX < mapTiles.length && tileY < mapTiles[0].length) {
      fill(0, 255, 0);
      stroke("green");
      rect(
        (tileX - 1) * TILE_SIZE,
        (tileY - 1) * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  } else if (editMode === 3) {
    tileX = Math.ceil(mouseX / TILE_SIZE);
    tileY = Math.ceil(mouseY / TILE_SIZE);
    if (tileX < mapTiles.length && tileY < mapTiles[0].length) {
      fill(0, 0, 255);
      stroke("blue");
      rect(
        (tileX - 1) * TILE_SIZE,
        (tileY - 1) * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

function mouseClicked() {
  if (mouseButton === LEFT) {
    if (editMode === 1) {
      if (mouseX < MAP_WIDTH && mouseY < MAP_HEIGHT) {
        let x = Math.ceil(mouseX / TILE_SIZE);
        let y = Math.ceil(mouseY / TILE_SIZE);
        mapTiles[x - 1][y - 1].type = 1;
      }
    } else if (editMode === 2) {
      if (mouseX < MAP_WIDTH && mouseY < MAP_HEIGHT) {
        if (finalPosition != null) {
          mapTiles[finalPosition[0]][finalPosition[1]].type = 0;
        }
        let x = Math.ceil(mouseX / TILE_SIZE);
        let y = Math.ceil(mouseY / TILE_SIZE);
        mapTiles[x - 1][y - 1].type = 2;
        finalPosition = [x - 1, y - 1];
      }
    } else if (editMode === 3) {
      if (mouseX < MAP_WIDTH && mouseY < MAP_HEIGHT) {
        if (playerPosition != null) {
          mapTiles[playerPosition[0]][playerPosition[1]].type = 0;
          mapTiles[playerPosition[0]][playerPosition[1]].estimate = -1;
          mapTiles[playerPosition[0]][playerPosition[1]].opened = false;
        }
        let x = Math.ceil(mouseX / TILE_SIZE);
        let y = Math.ceil(mouseY / TILE_SIZE);
        mapTiles[x - 1][y - 1].type = 3;
        mapTiles[x - 1][y - 1].estimate = 0;
        mapTiles[x - 1][y - 1].opened = true;
        playerPosition = [x - 1, y - 1];
      }
    }
  }
}

function keyPressed() {
  //D = empty/delete tile
  if (keyCode == 68) {
    if (mouseX < MAP_WIDTH && mouseY < MAP_HEIGHT) {
      let x = Math.ceil(mouseX / TILE_SIZE);
      let y = Math.ceil(mouseY / TILE_SIZE);
      if (mapTiles[x - 1][y - 1].type == 2) {
        finalPosition = null;
      } else if (mapTiles[x - 1][y - 1].type == 3) {
        playerPosition = null;
      }
      mapTiles[x - 1][y - 1].type = 0;
    }
  }
}

function draw() {
  clear();
  renderTileMap();
  checkTileHover();
  renderSideBar();
}
