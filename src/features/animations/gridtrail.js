import p5 from 'p5';

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
    const container = document.querySelector("[data-feature='grid-trail']");


    grid.setup = () => {

      if (container) {

        let cnv = grid.createCanvas(container.offsetWidth, container.offsetHeight);
        cnv.parent(container);
        colorWithAlpha = grid.color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
        grid.noFill();
        grid.stroke(colorWithAlpha);
        grid.strokeWeight(STROKE_WEIGHT);
        numRows = Math.ceil(container.offsetWidth / CELL_SIZE);
        numCols = Math.ceil(container.offsetHeight / CELL_SIZE);

      } else {
        console.log(container + "niet gevonden");
      }
    }

    grid.draw = () => {
      grid.background(BACKGROUND_COLOR);
      //change stroke color for default background grid
      grid.stroke(238, 59, 23, 30);
      let row = grid.floor(grid.mouseY / CELL_SIZE);
      let col = grid.floor(grid.mouseX / CELL_SIZE);

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          let x = col * CELL_SIZE;
          let y = row * CELL_SIZE;
          grid.rect(x, y, CELL_SIZE, CELL_SIZE)
        }
      }

      // check if mouse had moved to a different cell
      // if yes, getRandomNeighbors to display
      if (row !== currentRow || col !== currentCol) {
        currentCol = col;
        currentRow = row;

        allNeighbors.push(...getRandomNeighbors(row, col, numRows, numCols, PROB_OF_NEIGHBOR, STARTING_ALPHA));
      }

      let x = col * CELL_SIZE;
      let y = row * CELL_SIZE;

      grid.stroke(colorWithAlpha);
      grid.rect(x, y, CELL_SIZE, CELL_SIZE);

      for (let neighbor of allNeighbors) {
        let neighborX = neighbor.col * CELL_SIZE;
        let neighborY = neighbor.row * CELL_SIZE;

        neighbor.opacity = grid.max(0, neighbor.opacity - AMT_FADE_PER_FRAME)
        grid.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
        grid.rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
      }

      allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
    }


    grid.windowResized = () => {
      grid.resizeCanvas(container.offsetWidth, container.offsetHeight);
      numRows = Math.ceil(container.offsetWidth / CELL_SIZE);
      numCols = Math.ceil(container.offsetHeight / CELL_SIZE);
    };
  })
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
  backgroundGridTrail();
}

export default gridtrail;