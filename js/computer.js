var player_name = "";
var computer_selection = "";

window.addEventListener("load", () => {
  if (!available_modes.includes(getUrlParams().get("mode"))) {
    goBack();
  }
  if (getUrlParams().get("mode") == "computer") {
    if (document.querySelector("body.game-board")) {
      let vol = document.querySelector("i.v_o");
      vol.classList.add("fa-volume-xmark");

      resetGameBoard();
      onGamePageLoadWithComputer();
    }
  }
});
//this function will will be called when game board body loads
function onGamePageLoadWithComputer() {
  const getPlayerName = getUrlParams().get("player_name");
  const getSelection = getUrlParams().get("selection");
  if (
    !getPlayerName ||
    !getSelection ||
    !possibleSelection.includes(getSelection)
  ) {
    window.history.back();
  }
  player_name = getPlayerName;
  computer_selection = getSelection.toString().toLowerCase() == "x" ? "O" : "X";
  addEventToBoxesPlayingWithComputer(getSelection.toString().toUpperCase());
  initiateGameWithComputer();
}
// this function will add event listeners to all 9 boxes
function addEventToBoxesPlayingWithComputer(selection) {
  const list = document.querySelectorAll(".col");
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function () {
      if (!list[i].innerText) {
        list[i].innerText = selection;
        sound("../sounds/click.mp3").play();
        playHuman();
      } else {
        wrongMove(list[i]);
      }
    });
  }
}
//this function will tell who's going to start the game
function initiateGameWithComputer() {
  // var robot = 1;
  let first_starter =
    Math.round(Math.random() * 1) + 1 == 1 ? "robot" : "human";
  if (first_starter == "robot") {
    turn = "robot";
  } else {
    turn = "human";
  }
  changeTurn();
}
function changeTurn() {
  if (!gameOver) {
    var display = document.querySelector(".bottom_display");
    if (turn == "robot") {
      display.innerHTML = "Computers Turn";
      playComputer();
      checkWinner(updateWinnerUIInComputerMode);
    } else {
      display.innerHTML = "Your Turn";
    }
  }
}
function playComputer() {
  let empty_space = checkBoxSpace("empty");
  let rand = Math.floor(Math.random() * empty_space.length);
  if (empty_space.length !== 0) {
    document.querySelector(`.${empty_space[rand].position}`).innerHTML =
      computer_selection;
    if (isDraw()) {
      updateUIDraw("Dear `" + player_name + "` Thank you for Playing!");
    } else {
      setTimeout(function () {
        turn = "human";
        changeTurn();
      }, 1000);
    }
  }
}
function playHuman() {
  turn = "robot";
  checkWinner(updateWinnerUIInComputerMode);
  if (isDraw()) {
    updateUIDraw("Dear `" + player_name + "` Thank you for Playing!");
  } else {
    changeTurn();
  }
}
function updateWinnerUIInComputerMode() {
  volume();
  document.querySelector(".backdrop").style.display = "block";
  document.querySelector("#myAudio").pause();
  document.querySelector(".bottom_display").innerHTML =
    winner == computer_selection ? `Computer Wins` : `You Win`;
  gameOver = true;
  document.querySelector(".winner").innerHTML =
    winner == computer_selection ? `Computer Wins` : `You Win`;
  document.querySelector(".after_game_panel_text span").innerHTML =
    "Dear `" + player_name + "` Thank you for Playing!";
  document
    .querySelector(".after_game_panel")
    .classList.add("after_game_panel_open");
  if (winner == computer_selection) {
    sound("../sounds/loose.mp3").play();
  } else {
    sound("../sounds/win.mp3").play();
  }
}
