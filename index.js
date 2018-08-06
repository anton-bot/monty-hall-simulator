'use strict';

const random = require('random-number-csprng');

const CHOICES = {
  KEEP: false,
  SWITCH: true,
};

const PRIZES = {
  GOAT: false,
  CAR: true,
};

async function montyHall(iterations = 1000, doors = 3, print = true) {
  if (doors < 3) {
    throw new Error('The number of doors must be at least 3.');
  }

  const wins = {
    kept: 0, // player insisted on their initial bet
    switched: 0, // player switched their bet
  };

  let i = 0;
  while (i < iterations) {
    wins.kept += await play(CHOICES.KEEP, doors);
    wins.switched += await play(CHOICES.SWITCH, doors);
    i++;
  }

  if (print) {
    console.log(`
  ---------------------------------
  |                               |
  |  Monty Hall Problem Simulator |
  |                               |
  ---------------------------------

  Played ${iterations} iterations
  for each game scenario.

  Wins when player keeps the initial bet: ${formatWins(wins.kept, iterations)}
  Wins when player switches their bet:    ${formatWins(wins.switched, iterations)}`);
  } else {
    return { iterations, wins };
  }
}

/** Prints the results as "670 (67.00%)". */
function formatWins(wins, iterations) {
  return `${wins}/${iterations} (${((wins / iterations) * 100).toFixed(2)}%)`;
}

/** Executes one iteration of the game. */
async function play(playerSwitches, numDoors) {
  // Initialize the doors with goats, place a car randomly:
  let doors = new Array(numDoors);
  doors.fill(PRIZES.GOAT);
  doors[await random(0, numDoors - 1)] = PRIZES.CAR;

  // Player makes a bet:
  let playerBet = await random(0, numDoors - 1);

  // Monty opens a door with a goat - we eliminate it from the array:
  while (true) {
    let goatCandidateDoor = await random(0, numDoors - 1);
    if (goatCandidateDoor !== playerBet && doors[goatCandidateDoor] === PRIZES.GOAT) {
      doors.splice(goatCandidateDoor, 1);

      // Account for the shifted array indices after removing one element:
      if (playerBet > goatCandidateDoor) {
        playerBet--;
      }

      break;
    }
  }

  if (playerSwitches) {
    while (true) {
      let newRandomBet = await random(0, doors.length - 1);

      // Do not allow new bet to be the same as the previous one:
      if (newRandomBet !== playerBet) {
        playerBet = newRandomBet;
        break;
      }
    }
  }

  // True if car:
  return doors[playerBet];
}

module.exports = montyHall;
