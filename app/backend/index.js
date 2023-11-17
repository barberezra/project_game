const express = require('express');
const mysql = require('mysql');
const util = require('util'); // To convert callback-based APIs to promise-based
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server });

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());

ws.on('connection', (ws) => {
    // handle WebSocket connections
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    // Handle closing of the WebSocket connection
    ws.on('close', () => {
        console.log('Client disconnected from WebSocket');
    });
});


// Endpoint for handling database connection and WebSocket interaction
app.post('/dbconnect', async (req, res) => {
    try {
        const { winner, loser, dbString, tie } = req.body;
        
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'thebestgame',
            database: 'stuff'
        });
        const query = util.promisify(connection.query).bind(connection);
        // Retrieve maxWins and maxLoserWins
        const incrementQuery = `SELECT MAX(${winner}) AS maxWins, MAX(${loser}) AS maxLoserWins FROM scores`;
        const [rows] = await query(incrementQuery);

        let incWins = 1;
        let sameVal = 0;

        if (rows && rows.length > 0) {
            incWins = parseInt(rows[0].maxWins) + 1;
            sameVal = parseInt(rows[0].maxLoserWins);
        }

        let insertQuery;

        if (!tie) {
            // Parameterized query to prevent SQL injection
            insertQuery = `INSERT INTO scores (score, ${winner}, ${loser}) VALUES (?, ?, ?)`;
            await query(insertQuery, [dbString, incWins, sameVal]);
        } else {
            // Parameterized query for tie
            insertQuery = 'INSERT INTO scores (score, tie) VALUES (?, 1)';
            await query(insertQuery, [dbString]);
        }

        console.log('Query executed successfully');
        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error executing SQL queries:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    } finally {
        connection.end();
    }
});

server.listen(3003, () => {
    console.log('Server is running on port 3003');
});
