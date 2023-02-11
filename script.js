const gameBoard = (() => {
  const board = [[], [], []];

  const getBoard = () => {
    return board;
  };

  const placeMark = (mark, x, y) => {
    board[x][y] = mark;
  };

  return {
    getBoard,
    placeMark,
  };
})();

const grid = [[], [], []];
const rows = [...document.getElementsByTagName("tr")];
rows.forEach(
  (row, index) => (grid[index] = [...row.getElementsByTagName("td")])
);

grid.forEach((row, rowIndex) =>
  row.forEach((cell, colIndex) =>
    cell.addEventListener("click", () => console.log(rowIndex, colIndex))
  )
);
