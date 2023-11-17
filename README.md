# Mancala
### By: T'airra Champliss, Zoey La, Ezra Barber, & Emilie Morocco

## About
We recreated the Mancala game for CS347 using Docker. The game follows the original format with two player turns, the captured opposing pit special move, and the extra turn if marble lands in mancala pit. The game does not have functionality/animations to showcase each marble being distributed and instead distributes immediately on button click. The user will be notified if/when they have an extra turn/special move, and prevents players from clicking on the other's pits.

### Pages
- Home Page         (home base)
- New Game Page     (2 player turn-based game play)
- Game Over Page    (displays final score and winner/loser/tie)
- How To Play Page  (instructions on how to play mancala)
- Rankings Page     (other team's work; show ranked players from db: most wins, most loses, etc.)

## File Structure

```bash
├── app                  # runs web app
│   ├── backend          # server connecting to database
│   ├── public
│   ├── src              # front-end styling & components
│   └── ...
├── database             # stores game stats
└── docker-compose.yaml  # builds docker containers
```

## Stack
Front-End: React.js  
Back-end: Node.js, Express  
Database: MySQL  

## How To Run
