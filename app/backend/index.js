const express = require('express');
const mysql = require('mysql');
const util = require('util'); // To convert callback-based APIs to promise-based

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// Promisify the connection.query method
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thebestgame',
    database: 'stuff'
});
const query = util.promisify(connection.query).bind(connection);

app.post('/dbconnect', async (req, res) => {
    try {
        const { winner, loser, dbString, tie } = req.body;

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
            insertQuery = `INSERT INTO scores (score, %s, %s) VALUES (%s, %s, %s)`;
            await query(insertQuery, [winner, loser, dbString, incWins, sameVal]);
        } else {
            // Parameterized query for tie
            insertQuery = 'INSERT INTO scores (score, tie) VALUES (%s, 1)';
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
