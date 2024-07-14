var version = "version 0.0.1";

//All shared & individuals properties
var possibleSelection = ["x", "o"];
var available_modes = ["computer", "friend"];
var turn = "";
var winner = "";
var gameOver = false;
var strike_type = "";
var playSound = null;

window.addEventListener("load", () => {
  if (document.querySelector(".wrapper")) {
    document.querySelector(".wrapper").click();
  }
  if (document.querySelector("#version")) {
    document.querySelector("#version").innerHTML = version;
  }
});
// Individuals Methods Start
function startGameWithComputer() {
  let playerName = document.querySelector("#playerName").value;
  let selection_x = document.querySelector("#X").checked;
  let selection_o = document.querySelector("#O").checked;
  if (playerName && (selection_x || selection_o)) {
    window.location = `../views/game.html?player_name=${playerName}&selection=${
      selection_o ? "o" : "x"
    }&mode=computer`;
  } else {
    if (!playerName) {
      showMessage("Player name can not be empty");
    } else {
      showMessage("Please select `X` or `O`");
    }
  }
}
function sound(path) {
  playSound = new Audio(path);
  return playSound;
}
function volume() {
  let vol = document.querySelector("i.v_o");
  var x = document.querySelector("#myAudio");
  //turning on
  if (vol.classList.contains("fa-volume-xmark")) {
    vol.classList.remove("fa-volume-xmark");
    vol.classList.add("fa-volume-high");
    x.play();
  } else {
    //turning off
    vol.classList.remove("fa-volume-high");
    vol.classList.add("fa-volume-xmark");
    x.pause();
  }
}
function startPlayingWithFriend() {
  let playerName1 = document.querySelector("#playerName1").value;
  let playerName2 = document.querySelector("#playerName2").value;
  let randSelection = Math.round(Math.random() * 1) + 1 == 1 ? "x" : "o";

  if (playerName1 && playerName2) {
    window.location = `../views/game.html?player_name1=${playerName1}&player_name2=${playerName2}&p1=${randSelection}&p2=${
      randSelection == "x" ? "o" : "x"
    }&mode=friend`;
  } else {
    showMessage("Players name can not be empty");
  }
}
function level(selected) {
  if (selected == "easy") {
    document.querySelector("#hard").checked = false;
    localStorage.setItem("difficulty", "easy");
  } else {
    document.querySelector("#easy").checked = false;
    localStorage.setItem("difficulty", "hard");
  }
}
function loadIndex() {
  localStorage.setItem("difficulty", "easy");
  if (document.querySelector(".sound")) {
    document.querySelector(".sound").muted = false;
    document.querySelector(".sound").play();
  }
}
function loadSettings() {
  if (localStorage.getItem("difficulty")) {
    if (localStorage.getItem("difficulty") == "easy") {
      document.querySelector("#easy").checked = true;
    } else {
      document.querySelector("#hard").checked = true;
    }
  }
}
// Individuals Methods End

// Shared Methods Start
function wrongMove(currentBox) {
  const display = document.querySelector(".bottom_display");
  const temp = display.innerText;
  sound("../sounds/warning.mp3").play();
  currentBox.classList.add("warn");
  display.innerHTML = "You can't mark marked places";
  setTimeout(function () {
    display.innerHTML = temp;
    currentBox.classList.remove("warn");
  }, 2000);
}
function isDraw() {
  let box = checkBoxSpace("empty");
  if (box.length == 0 && !winner) {
    return true;
  } else {
    return false;
  }
}
function checkWinner(updateWinnerUI) {
  let allBox = checkBoxSpace();
  let strike = document.querySelector(".strike");
  // c0 c1 c2
  // c3 c4 c5
  // c6 c7 c8
  // this is the first 3 rows start
  if (
    allBox[0].value &&
    allBox[1].value &&
    allBox[2].value &&
    allBox[0].value == allBox[1].value &&
    allBox[0].value == allBox[2].value
  ) {
    winner = allBox[0].value;
    strike_type = "strike_row_first";
    strike.classList.add("strike_row_first");
  } else if (
    allBox[3].value &&
    allBox[4].value &&
    allBox[5].value &&
    allBox[3].value == allBox[4].value &&
    allBox[3].value == allBox[5].value
  ) {
    strike_row_first = "strike_row_second";
    winner = allBox[3].value;
    strike.classList.add("strike_row_second");
  } else if (
    allBox[6].value &&
    allBox[7].value &&
    allBox[8].value &&
    allBox[6].value == allBox[7].value &&
    allBox[6].value == allBox[8].value
  ) {
    strike_type = "strike_row_third";
    winner = allBox[6].value;
    strike.classList.add("strike_row_third");
  }
  // this is the first 3 rows ends

  // this is the first 3 columns start
  else if (
    allBox[0].value &&
    allBox[3].value &&
    allBox[6].value &&
    allBox[0].value == allBox[3].value &&
    allBox[0].value == allBox[6].value
  ) {
    strike_type = "strike_col_first";
    winner = allBox[0].value;
    strike.classList.add("strike_col_first");
  } else if (
    allBox[1].value &&
    allBox[4].value &&
    allBox[7].value &&
    allBox[1].value == allBox[4].value &&
    allBox[1].value == allBox[7].value
  ) {
    strike_type = "strike_col_second";
    winner = allBox[1].value;
    strike.classList.add("strike_col_second");
  } else if (
    allBox[2].value &&
    allBox[5].value &&
    allBox[8].value &&
    allBox[2].value == allBox[5].value &&
    allBox[2].value == allBox[8].value
  ) {
    strike_type = "strike_col_third";
    winner = allBox[2].value;
    strike.classList.add("strike_col_third");
  }
  // this is the first 3 columns ends

  // this is the first diagonal start
  else if (
    allBox[0].value &&
    allBox[4].value &&
    allBox[8].value &&
    allBox[0].value == allBox[4].value &&
    allBox[0].value == allBox[8].value
  ) {
    strike_type = "strike_diagonal_left";
    winner = allBox[0].value;
    strike.classList.add("strike_diagonal_left");
  } else if (
    allBox[2].value &&
    allBox[4].value &&
    allBox[6].value &&
    allBox[2].value == allBox[4].value &&
    allBox[2].value == allBox[6].value
  ) {
    strike_type = "strike_diagonal_right";
    winner = allBox[2].value;
    strike.classList.add("strike_diagonal_right");
  }
  // this is the first diagonal ends

  if (winner) {
    updateWinnerUI();
  }
}
function getUrlParams() {
  const queryString = window.location.search;
  return new URLSearchParams(queryString);
}
function showMessage(msg) {
  alert(msg);
}
function check(selected) {
  if (selected == "x") {
    document.querySelector("#O").checked = false;
  } else {
    document.querySelector("#X").checked = false;
  }
}
function goBack() {
  window.location = "../index.html";
}
function restartGame() {
  document
    .querySelector(".after_game_panel")
    .classList.remove("after_game_panel_open");
  document.querySelector(".backdrop").style.display = "none";
  goBack();
}
function resetGame() {
  winner = "";
  gameOver = false;
  turn = "";
  resetGameBoard();
  volume();
  document.querySelector(".backdrop").style.display = "none";
  document
    .querySelector(".after_game_panel")
    .classList.remove("after_game_panel_open");
  if (strike_type) {
    document.querySelector(".strike").classList.remove(strike_type);
  }
  if (getUrlParams().get("mode") == "computer") {
    initiateGameWithComputer();
  } else if (getUrlParams().get("mode") == "friend") {
    initiateGameWithFriend();
  } else {
    goBack();
  }
}
function resetGameBoard() {
  if (
    document.querySelectorAll(".col") &&
    document.querySelectorAll(".col").length != 0
  ) {
    var list = document.querySelectorAll(".col");
    for (let i = 0; i < list.length; i++) {
      list[i].innerHTML = "";
    }
  }
}
function checkBoxSpace(mode = "all") {
  let listArr = [];
  let list = document.querySelectorAll(".col");
  for (let i = 0; i < list.length; i++) {
    //mode is empty or all
    if (mode == "empty") {
      //checking to pass only empty boxes
      if (!list[i].innerText) {
        listArr.push({
          position: list[i].attributes.name.value,
          value: list[i].innerText,
        });
      }
    } else {
      listArr.push({
        position: list[i].attributes.name.value,
        value: list[i].innerText,
      });
    }
  }
  return listArr;
}
function updateUIDraw(msg) {
  volume();
  document.querySelector(".backdrop").style.display = "block";
  document.querySelector("#myAudio").pause();
  playSound = null;
  document.querySelector(".bottom_display").innerHTML = "Draw";
  gameOver = true;
  document.querySelector(".winner").innerHTML = "Draw";
  document.querySelector(".after_game_panel_text span").innerHTML = msg;
  document
    .querySelector(".after_game_panel")
    .classList.add("after_game_panel_open");
  sound("../sounds/draw.mp3").play();
}

// Shared Methods End
