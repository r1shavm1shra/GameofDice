# Game of Dice
The "Game of Dice" is a multiplayer game where N players roll a 6 faced dice in a round-robin fashion.
## Requirements
To run this program , you will only need Node.js

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

## Rules of the game
- The order in which the users roll the dice is decided randomly at the start of the game.
- If a player rolls the value "6" then they immediately get another chance to roll again and move
ahead in the game.
- If a player rolls the value "1" two consecutive times then they are forced to skip their next turn
as a penalty.
- As soon as a player accumulates M points they complete the game and are assigned a rank.
- The game ends when all players have accumulated at least M points.


