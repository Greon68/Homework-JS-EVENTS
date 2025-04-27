// TODO: write code here
"use strict";

// console.log("app.js included");

import GoblinGame from  "./game";

const gameElement = document.querySelector('.container-game');

let btnStart = document.querySelector('.btn-start');

const game = new GoblinGame(gameElement);

// Запускаем игру нажатием кнопки "Играем"

btnStart.addEventListener('click', game.createGame );
