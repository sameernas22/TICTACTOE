const cells = document.querySelectorAll(".gamediv");
const status = document.querySelector(".p");
const reset = document.querySelector(".restart");
//game checker

let gameIsLive = true;
let xIsNext = true;
let winner = null;

// functions
const handlereset = () => {
  gameIsLive = true;
  xIsNext = true;
  winner = null;
  status.innerHTML = "X's turn";

  for (const cell of cells) {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.classList.remove("won");
    for (const cell of cells) {
      cell.addEventListener("click", clickcell);
    }
  }
};
const handlewin = (letter) => {
  gameIsLive = false;
  winner = letter;
  if (winner == "x") {
    status.innerHTML = `<span>X WINNER!</span>`;
    for (const cell of cells) {
      cell.removeEventListener("click", clickcell);
    }
  } else {
    status.innerHTML = "<span>O WINNER</span>";
    for (const cell of cells) {
      cell.removeEventListener("click", clickcell);
    }
  }
};
const checkgamestatus = () => {
  const topleft = cells[0].classList[1];
  const topmid = cells[1].classList[1];
  const topright = cells[2].classList[1];
  const midleft = cells[3].classList[1];
  const midmid = cells[4].classList[1];
  const midright = cells[5].classList[1];
  const botleft = cells[6].classList[1];
  const botmid = cells[7].classList[1];
  const botright = cells[8].classList[1];
  //checking win
  if (topleft && topleft == topmid && topleft == topright) {
    handlewin(topleft);
    cells[0].classList.add("won");
    cells[1].classList.add("won");
    cells[2].classList.add("won");
  } else if (midleft && midleft == midmid && midleft == midright) {
    handlewin(midleft);
    cells[3].classList.add("won");
    cells[4].classList.add("won");
    cells[5].classList.add("won");
  } else if (botleft && botleft == botmid && botleft == botright) {
    handlewin(botleft);
    cells[6].classList.add("won");
    cells[7].classList.add("won");
    cells[8].classList.add("won");
  } else if (topleft && topleft == midleft && topleft == botleft) {
    handlewin(topleft);
    cells[0].classList.add("won");
    cells[3].classList.add("won");
    cells[6].classList.add("won");
  } else if (topmid && topmid == midmid && topmid == botmid) {
    handlewin(topmid);
    cells[1].classList.add("won");
    cells[4].classList.add("won");
    cells[7].classList.add("won");
  } else if (topright && topright == midright && topright == botright) {
    handlewin(topright);
    cells[2].classList.add("won");
    cells[5].classList.add("won");
    cells[8].classList.add("won");
  } else if (topleft && topleft == midmid && topleft == botright) {
    handlewin(topleft);
    cells[0].classList.add("won");
    cells[4].classList.add("won");
    cells[8].classList.add("won");
  } else if (topright && topright == midmid && topright == botleft) {
    handlewin(topright);
    cells[2].classList.add("won");
    cells[4].classList.add("won");
    cells[6].classList.add("won");
  } else if (
    topleft &&
    topmid &&
    topright &&
    midleft &&
    midmid &&
    midright &&
    botleft &&
    botmid &&
    botright
  ) {
    gameIsLive = false;
    status.innerHTML = "<span>DRAW</span>";
  }
};

const clickcell = (e) => {
  const classlist = e.target.classList;
  if (classlist[1] == "x" || classlist[1] == "o") {
    return;
  }

  if (xIsNext) {
    e.target.classList.add("x");
    checkgamestatus();
    xIsNext = false;
    if (gameIsLive) {
      status.innerHTML = "O's turn";
    }
  } else {
    e.target.classList.add("o");
    checkgamestatus();
    xIsNext = true;
    if (gameIsLive) {
      status.innerHTML = "X's turn";
    }
  }
};

//eventlisteners
reset.addEventListener("click", handlereset);
for (const cell of cells) {
  cell.addEventListener("click", clickcell);
}
