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
To run the Mancala game using Docker:

- Install Docker: If you don't already have Docker installed, download and install it from Docker's official website.
- Clone the Repository: Clone the project repository to your local machine using:

bash
Copy code
git clone [repository-url]
Replace [repository-url] with the URL of your project's repository.

- Navigate to the Project Directory: Open a terminal and navigate to the directory where the project is stored.

Build and Run with Docker Compose:

- To build the Docker containers for the frontend, backend, and database, run:
bash

docker-compose build
To start the application, run:
bash

docker-compose up
The application should now be running on http://localhost:8000 (or another port if you've configured it differently in your docker-compose.yaml).
Access the Application: Open a web browser and go to http://localhost:8000 to start playing Mancala.

## Contributing
This project is a collaborative effort, and contributions are always welcome. If you wish to contribute:

- Fork the Repository: Create your own fork of the project.
- Create a Feature Branch: Make your changes in a new git branch.
- Commit Your Changes: Commit your changes with clear, descriptive commit messages.
- Push to the Branch: Push your changes to your fork.
- Submit a Pull Request: Submit a pull request to our repository for review.
- Please ensure your code adheres to the project's coding standards and passes all tests.

## Testing
This project is equipped with automated tests to ensure functionality works as expected. To run these tests:
Navigate to the project directory in your terminal.
Run the test script using:
bash
Copy code
npm test