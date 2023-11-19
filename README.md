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
- About Page        (brief introduction of our team & about the project)

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
To run the Mancala game using Docker:

1. Install Docker: If you don't already have Docker installed, download and install it from Docker's official website.
2. Clone the Repository: Clone the project repository to your local machine using:

    `git clone [https://github.com/TetraGenesis/project_game.git]`
3. Navigate to the Project Directory: Open a terminal and navigate to the directory where the project is stored.

4. Build and Run with Docker Compose:
- To build the Docker containers for the frontend, backend, and database, run:

    `docker-compose build`
- To start the application, run:

    `docker-compose up`
- The application should now be running on http://localhost:7555.
5. Access the Application: Open a web browser and go to http://localhost:7555 to start playing Mancala.

## End User Documentation
### Introduction
Welcome to our digital version of Mancala, a traditional board game played around the world. This user guide will help you understand how to navigate and play the game on our platform.

### Starting the Game
To start playing Mancala:
1. Open your web browser and navigate to http://localhost:7555.
2. Click on the 'New Game' button on the home page.
3. Enter the names of the two players.
4. Select the pronouns for each player from the dropdown menu or enter custom pronouns if you choose 'Other'.
5. Click 'Start Game' to begin.

### Game Rules
Mancala is played with a board divided into two parts, each with six pits and a larger store pit at the end. The game begins with four stones in each of the smaller pits.

### Objective
The objective is to collect as many stones as possible in your store pit.

### Turns
Players take turns picking up all the stones from one of the pits on their side and "sowing" them, one by one, in each pit counter-clockwise around the board, including their own store but not their opponent's store.

### Captures
If the last stone you sow lands in an empty pit on your side of the board, you capture all the stones in the pit directly opposite.

### Extra Turns
If the last stone you sow lands in your own store, you get an extra turn.

### Game End
The game ends when all six pits on one side of the board are empty. The player with the most stones in their store at the end of the game wins.

### Special Features
- **Pronoun Selection**: Players can select pronouns to be used during the game for a personalized experience.
- **Special Move Notifications**: The game will notify players of any special moves such as captures or extra turns.

### Troubleshooting
If you encounter any issues while playing the game, please try refreshing the browser...

Thank you for playing Mancala, and we hope you enjoy the game!


## Contributing
This project is a collaborative effort, and contributions are always welcome. If you wish to contribute:
- Create your own fork of the project.
- Make your changes in a new git branch.
- Submit a Pull Request: Submit a pull request to our repository for review.