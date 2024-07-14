var p1_name = "";
var p2_name = "";
var p1_selection = "";
var p2_selection = "";
window.addEventListener("load", () => {
  if (!available_modes.includes(getUrlParams().get("mode"))) {
    goBack();
  }
  if (getUrlParams().get("mode") == "friend") {
    if (document.querySelector("body.game-board")) {
      resetGameBoard();
      onGamePageLoadWithFriend();
    }
  }
});
function onGamePageLoadWithFriend() {
  p1_name = getUrlParams().get("player_name1");
  p2_name = getUrlParams().get("player_name2");
  const getP1 = getUrlParams().get("p1");
  const getP2 = getUrlParams().get("p2");
  if (
    !p1_name ||
    !p2_name ||
    !possibleSelection.includes(getP1) ||
    !possibleSelection.includes(getP2)
  ) {
    window.history.back();
  }
  p1_selection = getP1.toString().toLowerCase();
  p2_selection = getP2.toString().toLowerCase();

  addEventToBoxesPlayingWithFriend();
  initiateGameWithFriend();
}

function addEventToBoxesPlayingWithFriend() {
  let list = document.querySelectorAll(".col");
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function () {
      if (!list[i].innerText) {
        list[i].innerText = turn == p1_name ? p1_selection : p2_selection;
        sound("../sounds/click.mp3").play();
        playGameWithFriend();
      } else {
        wrongMove(list[i]);
      }
    });
  }
}
function initiateGameWithFriend() {
  let first_starter =
    Math.round(Math.random() * 1) + 1 == 1 ? p1_name : p2_name;
  if (first_starter == p1_name) {
    turn = p1_name;
  } else {
    turn = p2_name;
  }
  playerTurn();
}

function playerTurn() {
  if (!gameOver) {
    var display = document.querySelector(".bottom_display");
    if (turn == p1_name) {
      display.innerHTML = `${p1_name} Turn`;
    } else {
      display.innerHTML = `${p2_name} Turn`;
    }
  }
}
function playGameWithFriend() {
  turn = turn == p1_name ? p2_name : p1_name;
  checkWinner(updateWinnerUIInFriendMode);
  if (isDraw()) {
    updateUIDraw(
      "Dear `" + p1_name + " & " + p2_name + "` Thank you for Playing!"
    );
  } else {
    playerTurn();
  }
}
function updateWinnerUIInFriendMode() {
  volume();
  document.querySelector(".backdrop").style.display = "block";
  document.querySelector("#myAudio").pause();
  document.querySelector(".bottom_display").innerHTML =
    winner == p1_name ? `${p1_name} Wins` : `${p2_name} Wins`;
  gameOver = true;
  document.querySelector(".winner").innerHTML =
    winner == p1_name ? `${p1_name} Wins` : `${p2_name} Wins`;
  document.querySelector(".after_game_panel_text span").innerHTML =
    "Dear `" + p1_name + " & " + p2_name + "` Thank you for Playing!";
  document
    .querySelector(".after_game_panel")
    .classList.add("after_game_panel_open");
  sound("../sounds/win.mp3").play();
}
