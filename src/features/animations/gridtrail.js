import p5 from 'p5';

const container = document.querySelector("[data-feature='grid-trail']");

function backgroundGridTrail() {
  new p5((grid) => {
    const CELL_SIZE = 40;
    const COLOR_R = 238;
    const COLOR_G = 59;
    const COLOR_B = 23;
    const STARTING_ALPHA = 127;
    const BACKGROUND_COLOR = "#080a0c";
    const PROB_OF_NEIGHBOR = .4;
    const AMT_FADE_PER_FRAME = 5;
    const STROKE_WEIGHT = 1;

    let colorWithAlpha;
    let numRows;
    let numCols;
    let currentRow = -1;
    let currentCol = -1;
    let allNeighbors = [];

    grid.setup = () => {
      if (container) {
        let cnv = grid.createCanvas(container.offsetWidth, container.offsetHeight);
        cnv.parent(container);
        colorWithAlpha = grid.color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
        grid.noFill();
        grid.stroke(colorWithAlpha);
        grid.strokeWeight(STROKE_WEIGHT);
        numCols = Math.ceil(grid.width / CELL_SIZE);  // Gebruik grid.width en grid.height hier
        numRows = Math.ceil(grid.height / CELL_SIZE);
      } else {
        console.log(container + " niet gevonden");
      }
    };

    grid.draw = () => {
      grid.background(BACKGROUND_COLOR);

      // Change stroke color for default background grid
      grid.stroke(238, 59, 23, 30);

      // Herteken het volledige grid gebaseerd op de actuele canvasgrootte
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          let x = col * CELL_SIZE;
          let y = row * CELL_SIZE;
          grid.rect(x, y, CELL_SIZE, CELL_SIZE);
        }
      }

      // Bepaal de huidige cel waar de muis zich in bevindt
      let row = grid.floor(grid.mouseY / CELL_SIZE);
      let col = grid.floor(grid.mouseX / CELL_SIZE);

      // Controleer of muis zich binnen het canvas bevindt
      if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
        if (row !== currentRow || col !== currentCol) {
          currentCol = col;
          currentRow = row;

          allNeighbors.push(...getRandomNeighbors(row, col, numRows, numCols, PROB_OF_NEIGHBOR, STARTING_ALPHA));
        }

        // Highlight de cel waar de muis zich bevindt
        let x = col * CELL_SIZE;
        let y = row * CELL_SIZE;
        grid.stroke(colorWithAlpha);
        grid.rect(x, y, CELL_SIZE, CELL_SIZE);
      }

      // Teken de oplichtende buren en fade ze uit
      for (let neighbor of allNeighbors) {
        let neighborX = neighbor.col * CELL_SIZE;
        let neighborY = neighbor.row * CELL_SIZE;

        neighbor.opacity = grid.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
        grid.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
        grid.rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
      }

      // Verwijder buren die volledig zijn uitgevaagd
      allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
    };

    // Zorg ervoor dat canvas en grid up-to-date blijven bij een window resize
    grid.windowResized = () => {
      grid.resizeCanvas(container.offsetWidth, container.offsetHeight);
      numCols = Math.ceil(grid.width / CELL_SIZE);
      numRows = Math.ceil(grid.height / CELL_SIZE);
    };
  });
}

function getRandomNeighbors(row, col, numRows, numCols, probOfNeighbor, startingAlpha) {
  let neighbors = [];

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      let neighborRow = row + dRow;
      let neighborCol = col + dCol;

      let isCurrentCell = dRow === 0 && dCol === 0;

      let isInBounds =
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;

      if (!isCurrentCell && isInBounds && Math.random() < probOfNeighbor) {
        neighbors.push({
          row: neighborRow,
          col: neighborCol,
          opacity: startingAlpha
        });
      }
    }
  }

  return neighbors;
}

function gridtrail() {
  if (!container) return;
  backgroundGridTrail();
}

export default gridtrail;