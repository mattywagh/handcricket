let playerScore = 0;
let computerScore = 0;
let isPlayerBatting = true;
let isFirstInnings = true; // Tracks if it's the first innings
let target = 0;
let gameStarted = false;

let playerScores = []; // Array to track individual player scores
let computerScores = []; // Array to track individual computer scores

// Toss logic: Choose heads or tails
function chooseToss(choice) {
  const tossResult = Math.random() < 0.5 ? "heads" : "tails";
  const tossSection = document.getElementById("toss-section");
  const batBowlSection = document.getElementById("bat-bowl-section");

  // Hide toss buttons
  tossSection.style.display = "none";

  // Display toss result
  document.getElementById("toss-result").innerText = `The toss result is: ${tossResult}`;

  // If user won the toss, let them choose bat or bowl
  if (choice === tossResult) {
    batBowlSection.style.display = "block";
  } else {
    // Computer wins toss, random decision for bat or bowl
    isPlayerBatting = Math.random() < 0.5 ? false : true;
    const computerDecision = isPlayerBatting ? "bowl" : "bat";
    alert(`Computer won the toss and chose to ${computerDecision}.`);
    startGame();
  }
}

// Function to choose bat or bowl after winning the toss
function chooseBatBowl(decision) {
  const batBowlSection = document.getElementById("bat-bowl-section");

  // Hide bat/bowl buttons
  batBowlSection.style.display = "none";

  // Set player's choice for batting or bowling
  isPlayerBatting = decision === "bat";
  document.getElementById("toss-result").innerText += ` You chose to ${decision}.`;

  startGame();
}

// Function to start the game after toss and selection
function startGame() {
  gameStarted = true;
  document.getElementById("input-section").style.display = "block"; // Show the input section for the game
  updateScoreboard();
}

// Function to generate a random number between 1 and 6 for the computer's turn
function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to display the correct hand emojis for both player and computer
function displayHands(playerChoice, computerChoice) {
  const handEmojis = {
    1: '☝️',  // 1 finger
    2: '✌️',  // 2 fingers (peace sign)
    3: '🤟',  // 3 fingers (I love you sign)
    4: '🖖',  // 4 fingers (Vulcan salute)
    5: '🖐️',  // 5 fingers (open hand)
    6: '👍'   // 6 fingers (thumb only, for a six)
  };

  // Display the correct emoji for player's hand
  document.getElementById("player-hand-image").innerText = handEmojis[playerChoice];

  // Display the correct emoji for computer's hand
  document.getElementById("computer-hand-image").innerText = handEmojis[computerChoice];
}

// Function to update the scoreboard on the webpage
function updateScoreboard() {
  document.getElementById("player-score").innerText = `Player Score: ${playerScore}`;
  document.getElementById("computer-score").innerText = `Computer Score: ${computerScore}`;

  // Update the "X runs to win" counter only in the second innings
  if (!isFirstInnings && isPlayerBatting) {
    let runsNeeded = target - playerScore;
    if (runsNeeded > 0) {
      document.getElementById("runs-to-win").innerText = `${runsNeeded} runs to win`;
    } else {
      document.getElementById("runs-to-win").innerText = '';
    }
  }
}

// Function to update the player score history
function updatePlayerScoreHistory() {
  const playerHistoryDiv = document.getElementById("player-score-history");
  playerHistoryDiv.innerHTML = playerScores.join('   ');
}

// Function to update the computer score history
function updateComputerScoreHistory() {
  const computerHistoryDiv = document.getElementById("computer-score-history");
  computerHistoryDiv.innerHTML = computerScores.join('   ');
}

// Main function that runs each round of the game
function playRound() {
  if (!gameStarted) {
    document.getElementById("commentary-line").innerText = "The game hasn't started yet. Please toss the coin first.";
    return;
  }

  // Get the player's choice from the input
  let playerChoice = parseInt(document.getElementById("player-choice").value);

  // Validate that the player's choice is between 1 and 6
  if (isNaN(playerChoice) || playerChoice < 1 || playerChoice > 6) {
    document.getElementById("commentary-line").innerText = "Please choose a number between 1 and 6.";
    return;
  }

  // Get the computer's choice by generating a random number
  let computerChoice = getRandomNumber();

  // Display the correct hand images for both player and computer
  displayHands(playerChoice, computerChoice);

  // Game logic: check if the player or computer is out (i.e., they chose the same number)
  if (playerChoice === computerChoice) {
    alert("Wicket has fallen!");  // Alert when a wicket falls
    if (isPlayerBatting) {
      if (isFirstInnings) {
        target = playerScore; // Set the target score for the computer to beat
        isFirstInnings = false; // End the first innings
        isPlayerBatting = false; // Switch to computer's batting
        document.getElementById("commentary-line").innerText = `You scored ${target} runs. Now the computer needs ${target + 1} runs to win.`;
      } else {
        determineWinner(); // Check who won the game
      }
    } else {
      // If the computer is out in the first innings, switch to player batting
      if (isFirstInnings) {
        target = computerScore; // Set the target for the player to chase
        isFirstInnings = false; // End the first innings
        isPlayerBatting = true; // Switch to player batting
        document.getElementById("commentary-line").innerText = `The computer scored ${target} runs. You need ${target + 1} runs to win.`;
      } else {
        determineWinner(); // If the computer is out in the second innings, check the winner
      }
    }
    // Re-enable the input section to continue the next innings
    document.getElementById("input-section").style.display = "block";
  } else {
    // If it's the player's turn to bat, add the runs to the player's score
    if (isPlayerBatting) {
      playerScore += playerChoice;
      playerScores.push(playerChoice); // Add to player score history
      updatePlayerScoreHistory(); // Update the score history display
      displayCommentary(playerChoice);  // Display commentary for player's run
      if (!isFirstInnings && playerScore >= target) {
        alert("Player wins!");
        endGame();
      }
    } else {
      // If it's the computer's turn, add the runs to the computer's score
      computerScore += computerChoice;
      computerScores.push(computerChoice); // Add to computer score history
      updateComputerScoreHistory(); // Update the score history display
      displayCommentary(computerChoice);  // Display commentary for computer's run

      // Check if the computer has exceeded the target score
      if (!isFirstInnings && computerScore > target) {
        alert("Computer wins!");
        endGame();
      }
    }
  }

  // Update the scoreboard after each round
  updateScoreboard();
}

// Function to start the next innings after a wicket
function startNextInnings() {
  document.getElementById("input-section").style.display = "block"; // Show the input section for next innings
  document.getElementById("commentary-line").innerText = "Next innings has started!";
}

// Function to determine the winner based on the scores
function determineWinner() {
  let winner = playerScore > computerScore ? "Player" : "Computer";
  alert(`${winner} wins!`);
  endGame();
}

// Function to end the game and show the "New Game" button
function endGame() {
  document.getElementById("new-game-section").style.display = "block";
  document.getElementById("input-section").style.display = "none";
}

// Function to reset the game for a new match
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  isPlayerBatting = true;
  isFirstInnings = true;
  target = 0;
  gameStarted = false;
  playerScores = []; // Reset player scores history
  computerScores = []; // Reset computer scores history
  document.getElementById("runs-to-win").innerText = ''; // Clear the "X runs to win" message
  updatePlayerScoreHistory(); // Clear the player score history display
  updateComputerScoreHistory(); // Clear the computer score history display
  updateScoreboard();

  // Show the toss section again and hide the new game button
  document.getElementById("toss-section").style.display = "block";
  document.getElementById("new-game-section").style.display = "none";
}
