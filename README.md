# Monty Hall Problem Simulator

Simulates the Monty Hall Problem over a given number of iterations, with an arbitrary number of doors.

Uses a cryptographically secure pseudorandom number generator. Returns the results or prints them to console.

For a more convincing demonstration, you can play a game with 100 doors, when Monty opens 98 doors before offering to switch. This results in a 99% winning chance when switching.

## async monty(iterations, doors, print)

- `iterations` - Number of games for each scenario (player switches / player stays). Default 1000.
- `doors` - Number of doors in the game. Default 3.
- `print` - Whether to print results to console (default: `true`). If false, returns results in the format:

```json
{
  "iterations": 1000,
  "wins": {
    "kept": 333,
	"switched": 667,
  }
}
```

## Examples

### Classical Monty Hall game: 

```js

const monty = require('monty-hall-simulator');

monty();

//  ---------------------------------
//  |                               |
//  |  Monty Hall Problem Simulator |
//  |                               |
//  ---------------------------------
//
//  Played 1000 iterations
//  for each game scenario.
//
//  Wins when player keeps the initial bet: 354/1000 (35.40%)
//  Wins when player switches their bet:    657/1000 (65.70%)

```

### Play more iterations - to get more precise results

```js
const monty = require('monty-hall-simulator');

monty(1000000);

//  ---------------------------------
//  |                               |
//  |  Monty Hall Problem Simulator |
//  |                               |
//  ---------------------------------
//
//  Played 1000000 iterations
//  for each game scenario.
//
//  Wins when player keeps the initial bet: 334154/1000000 (33.42%)
//  Wins when player switches their bet:    666065/1000000 (66.61%)
```

### Play with more doors 

```js
const monty = require('monty-hall-simulator');

monty(10000, 100);

//  ---------------------------------
//  |                               |
//  |  Monty Hall Problem Simulator |
//  |                               |
//  ---------------------------------
//
//  Played 10000 iterations
//  for each game scenario.
//
//  Wins when player keeps the initial bet: 97/10000 (0.97%)
//  Wins when player switches their bet:    9898/10000 (98.98%)
```