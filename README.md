# Mancala
### By: T'airra Champliss, Zoey La, Ezra Barber, & Emilie Morocco

## About
We recreated the Mancala game for CS347 using Docker. Mancala is played with a board divided into two parts, each with six pits and a larger store pit at the end. The game begins with four stones in each of the smaller pits. The objective is to collect as many stones as possible in your store pit. Players take turns picking up all the stones from one of the pits on their side and dispersing them, one by one, in each pit counter-clockwise around the board, including their own store but not their opponent's store. If the last stone you picked lands in an empty pit on your side of the board, you capture all the stones in the pit directly opposite. If the last stone you picked lands in your own store, you get an extra turn. The game will notify players of any special moves such as captures or extra turns. Finally, the game ends when all six pits on one side of the board are empty. The player with the most stones in their store at the end of the game wins.

### Pages
- Home Page         (home base)
- New Game Page     (2 player turn-based game play)
- Game Over Page    (displays final score and winner/loser/tie)
- How To Play Page  (instructions on how to play mancala)
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

## Starting the Game
To start playing Mancala:
1. Open your web browser and navigate to http://localhost:7555.
2. Click on the 'New Game' button on the home page.
3. Enter the names of the two players.
4. Click 'Start Game' to begin.

### Troubleshooting
If you encounter any issues while playing the game, please try refreshing the browser... or reach out to any of us!

Thank you for playing Mancala, and we hope you enjoy the game!


## Contributing
This project is a collaborative effort, and contributions are always welcome. If you wish to contribute:
- Create your own fork of the project.
- Make your changes in a new git branch.
- Submit a Pull Request: Submit a pull request to our repository for review.

## Notes
There was supposed to be a Rankings Page from team AlgorithmArena. However, our team was quite disorganized at the time the collaboration was supposed to happen, so we ultimately decided to scrape the Rankings page.

## Acknowledgments 
We would like to thank Professor Matthew Lepinski for the mentorship and to all who provided feedback and support throughout the development process! Additionnaly, thank you to AlgorithmArena for working on a portion of our game's database, which entails showing ranked players from db: most wins, most loses, and more!