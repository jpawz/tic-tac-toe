const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const xWin = "xxx";
  const oWin = "ooo";

  let mark = "o";

  const getBoard = () => {
    return board;
  };

  const resetBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
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

  const getWinner = () => {
    // check rows
    for (const row of board) {
      if (row.join("") == xWin) {
        return "x";
      }
      if (row.join("") == oWin) {
        return "o";
      }
    }

    // check columns
    for (let i = 0; i < board.length; i++) {
      let result = "";
      for (let j = 0; j < board.length; j++) {
        result += board[j][i];
      }
      if (result == xWin) {
        return "x";
      }
      if (result == oWin) {
        return "o";
      }
    }

    // check diagonal 1
    let diagonalResult = "";
    for (let i = 0; i < board.length; i++) {
      diagonalResult += board[i][i];
    }
    if (diagonalResult == xWin) {
      return "x";
    }
    if (diagonalResult == oWin) {
      return "o";
    }

    // check diagonal 2
    diagonalResult = "";
    for (let i = board.length - 1; i >= 0; i--) {
      let j = board.length - 1 - i;
      diagonalResult += board[i][j];
    }
    if (diagonalResult == xWin) {
      return "x";
    }
    if (diagonalResult == oWin) {
      return "o";
    }

    return "";
  };

  return {
    getBoard,
    resetBoard,
    placeMark,
    getWinner,
  };
})();

const Player = (mark) => {
  const playerMark = mark;
  let score = 0;

  const getMark = () => {
    return playerMark;
  };

  const getScore = () => {
    return score;
  };

  const updateScore = (newScore) => {
    score = newScore;
  };

  return { getMark, getScore, updateScore };
};

const playerO = Player("o");
const playerX = Player("x");

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

  function clearGrid() {
    grid.forEach((row) =>
      row.forEach((cell) => {
        cell.innerText = "";
      })
    );
  }

  function updateScore() {
    const oScore = document.getElementsByClassName("oScore")[0];
    oScore.innerText = playerO.getScore();
    const xScore = document.getElementsByClassName("xScore")[0];
    xScore.innerText = playerX.getScore();
  }

  function checkWinner() {
    if (gameBoard.getWinner() == "x") {
      playerX.updateScore(playerX.getScore() + 1);
      updateScore();
    }
    if (gameBoard.getWinner() == "o") {
      playerO.updateScore(playerO.getScore() + 1);
      updateScore();
    }
  }

  grid.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) =>
      cell.addEventListener("click", () => {
        gameBoard.placeMark(rowIndex, colIndex);
        updateGrid();
        checkWinner();
      })
    )
  );

  const startButton = document.getElementsByClassName("start")[0];
  startButton.addEventListener("click", () => {
    gameBoard.resetBoard();
    clearGrid();
    checkWinner();
  });
})();
