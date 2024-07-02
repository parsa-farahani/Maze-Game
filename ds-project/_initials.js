const gameState = document.querySelector('.game-state');
const player1Info = document.querySelector('.player1-info');
const player2Info = document.querySelector('.player2-info');
const player1StopState = document.querySelector('.player1-info .stop-state');
const player2StopState = document.querySelector('.player2-info .stop-state');
const player1Score = document.querySelector('.player1-info .score-state');
const player2Score = document.querySelector('.player2-info .score-state');
const winnerName = document.querySelector('.winner');
const loserName = document.querySelector('.loser');
const results = document.querySelector('.results');

const UNIT_SIZE = 20;
const STOP_TIME = 3000;