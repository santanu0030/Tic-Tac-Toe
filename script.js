const boxces = document.querySelectorAll(".box");
const button = document.getElementById("btn");
const Point = document.getElementById("point");
let isPress = true; // true for human (X), false for computer (0)
let point = 0;

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resultButton(message, color) {
  button.innerText = message;
  button.style.backgroundColor = color;
}

function playAgain(){
  boxces.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "auto";
  })
  isPress = true;
  resultButton("Play Again", "#1b263b")
}

function updateUserPoint(winner) {
  if (winner === "X") {
    point = point + 10;
    Point.innerText = point;
  }
  else{
    point = point - 10;
    Point.innerText = point;
  }
}

function drawSituation() {
  let emptyBoxes = [...boxces].filter((box) => box.innerText === "");
  if (emptyBoxes.length === 0) {
    return true;
  }
  return false;
}

const disableAllBox = () => {
  boxces.forEach((boxx) => {
    boxx.style.pointerEvents = "none";
  });
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1 = boxces[pattern[0]].innerText;
    let pos2 = boxces[pattern[1]].innerText;
    let pos3 = boxces[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        resultButton(`Winner is " ${pos1} "`, "green");
        updateUserPoint(pos1);
        disableAllBox();
        setTimeout(() => {
          playAgain();
        }, 2500);
        return true; // A winner was found
      } else if (drawSituation()) {
        resultButton(`Game Draw`, "#1b263b");
        setTimeout(() => {
          playAgain()
        }, 2500);
      }
    }
  }
  return false; // No winner found
};

const computerMove = () => {
  // Get all empty boxes
  const emptyBoxes = [...boxces].filter((box) => box.innerText === "");
  if (emptyBoxes.length > 0) {
    // Choose a random empty box for the computer's move
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "O";
    randomBox.style.pointerEvents = "none"; // Disable the box after click
    return checkWinner(); // Check if the computer has won
  }
  return false;
};

boxces.forEach((box) => {
  box.addEventListener("click", () => {
    if (isPress) {
      box.innerText = "X";
      isPress = false;
      box.style.pointerEvents = "none"; // Disable the box after click
      if (!checkWinner()) {
        // After human move, let the computer play
        setTimeout(() => {
          if (!computerMove()) {
            isPress = true; // Enable human to play after the computer's move
          }
        }, 1000); // Delay for computer's move
      }
    }
  });
});
