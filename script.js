const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let mark = "o";

  const getBoard = () => {
    return board;
  };

  const placeMark = (x, y) => {
    if (isEmpty(x, y)) {
      board[x][y] = mark;
      switchMark();
    }
  };

  const isEmpty = (x, y) => {
    return !board[x][y];
  };

  const switchMark = () => {
    if (mark == "o") {
      mark = "x";
    } else {
      mark = "o";
    }
  };

  return {
    getBoard,
    placeMark,
  };
})();

const displayController = (() => {
  const grid = [[], [], []];
  const rows = [...document.getElementsByTagName("tr")];
  rows.forEach(
    (row, index) => (grid[index] = [...row.getElementsByTagName("td")])
  );

  function updateGrid() {
    grid.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        cell.innerText = gameBoard.getBoard()[rowIndex][colIndex];
      })
    );
  }

  grid.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) =>
      cell.addEventListener("click", () => {
        gameBoard.placeMark(rowIndex, colIndex);
        updateGrid();
      })
    )
  );
})();
