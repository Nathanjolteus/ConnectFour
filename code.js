//Selectors to be Manipulated
let tableRow = document.getElementsByTagName("tr");
let tableCell = document.getElementsByTagName("td");
let tableSlot = document.querySelectorAll(".slot");
let playerTurn = document.querySelector(".player-turn");
let reset = document.querySelector(".reset");

for (let i = 0; i < tableCell.length; i++) {
  tableCell[i].addEventListener("click", (evt) => {
    console.log(
      `${evt.target.parentElement.rowIndex}, ${evt.target.cellIndex}`
    );
  });
}

while (!player1) {
  var player1 = prompt("Player one enter your name. Red is your color.");
}

player1Color = "red";

while (!player2) {
  var player2 = prompt("Player two enter your name. Black is your color.");
}

player2Color = "black";

let currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn!`;

Array.prototype.forEach.call(tableCell, (cell) => {
  cell.addEventListener("click", changeColor);
  cell.style.backgroundColor = "white";
});

function changeColor(evt) {
  let column = evt.target.cellIndex;
  let row = [];

  for (let i = 5; i > -1; i--) {
    if (tableRow[i].children[column].style.backgroundColor == "white") {
      row.push(tableRow[i].children[column]);
      if (currentPlayer === 1) {
        row[0].style.backgroundColor = player1Color;
        if (
          horizontalCheck() ||
          verticalCheck() ||
          diagonalCheckOne() ||
          diagonalCheckTwo()
        ) {
          return alert(`${player1} wins!!`);
        } else if (drawCheck()) {
          playerTurn.textContent = "Game is a draw";
          return alert("Draw");
        } else {
          playerTurn.textContent = `${player2}'s turn!`;
          return (currentPlayer = 2);
        }
      } else {
        row[0].style.backgroundColor = player2Color;
        if (
          horizontalCheck() ||
          verticalCheck() ||
          diagonalCheckOne() ||
          diagonalCheckTwo()
        ) {
          return alert(`${player2} wins!!`);
        } else if (drawCheck()) {
          playerTurn.textContent = "Game is a draw";
          return alert("Draw");
        } else {
          playerTurn.textContent = `${player1}'s turn!`;
          return (currentPlayer = 1);
        }
      }
    }
  }

  function colorMatchCheck(one, two, three, four) {
    return one == two && one == three && one == four && one !== "white";
  }

  function horizontalCheck() {
    for (let row = 0; row < tableRow.length; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          colorMatchCheck(
            tableRow[row].children[col].style.backgroundColor,
            tableRow[row].children[col + 1].style.backgroundColor,
            tableRow[row].children[col + 2].style.backgroundColor,
            tableRow[row].children[col + 3].style.backgroundColor
          )
        ) {
          return true;
        }
      }
    }
  }

  function verticalCheck() {
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          colorMatchCheck(
            tableRow[row].children[col].style.backgroundColor,
            tableRow[row + 1].children[col].style.backgroundColor,
            tableRow[row + 2].children[col].style.backgroundColor,
            tableRow[row + 3].children[col].style.backgroundColor
          )
        ) {
          return true;
        }
      }
    }
  }

  function diagonalCheckOne() {
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          colorMatchCheck(
            tableRow[row].children[col].style.backgroundColor,
            tableRow[row + 1].children[col + 1].style.backgroundColor,
            tableRow[row + 2].children[col + 2].style.backgroundColor,
            tableRow[row + 3].children[col + 3].style.backgroundColor
          )
        ) {
          return true;
        }
      }
    }
  }

  function diagonalCheckTwo() {
    for (let col = 0; col < 4; col++) {
      for (let row = 5; row > 2; row--) {
        if (
          colorMatchCheck(
            tableRow[row].children[col].style.backgroundColor,
            tableRow[row - 1].children[col + 1].style.backgroundColor,
            tableRow[row - 2].children[col + 2].style.backgroundColor,
            tableRow[row - 3].children[col + 3].style.backgroundColor
          )
        ) {
          return true;
        }
      }
    }
  }

  function drawCheck() {
    let fullSlot = [];
    for (let i = 0; i < tableCell.length; i++) {
      if (tableCell[i].style.backgroundColor !== "white") {
        fullSlot.push(tableCell[i]);
      }
    }
    if (fullSlot.length === tableCell.length) {
      return true;
    }
  }
}

reset.addEventListener("click", () => {
  tableSlot.forEach((slot) => {
    slot.style.backgroundColor = "white";
  });
  playerTurn.style.color = "black";
  return currentPlayer === 1
    ? (playerTurn.textContent = `${player1}'s turn`)
    : (playerTurn.textContent = `${player2}'s turn`);
});
