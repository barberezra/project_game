const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.get('/dbconnect', (req, res) => {
    //  Replace with db code
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'thebestgame',
        database: 'stuff'
    });

    try {
        connection.connect((err) => {
            if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
            }
            console.log('Connected to MySQL');
        });

        var incrementQuery = {query: `SELECT MAX(${winner}) AS maxWins, MAX(${loser}) AS maxLoserWins FROM scores`};
        const [rows, fields] = connection.execute(incrementQuery);

        if (rows && rows.length > 0) {
        incWins = parseInt(rows[0].maxWins) + 1;
        sameVal = parseInt(rows[0].maxLoserWins);
        }
        let insertQuery;
        if (!tie) {
            insertQuery = `INSERT INTO scores (score, %s, %s) VALUES (%s, %s, %s)`;
            const [insertRows, insertFields] = connection.execute(insertQuery, [
                winner,
                loser,
                dbString,
                incWins,
                sameVal
            ]);
            console.log('Query executed successfully:', insertRows);
        } 
        else {
            insertQuery = 'INSERT INTO scores (score, tie) VALUES (%s, 1)';
            const [insertRows, insertFields] = connection.execute(insertQuery, [
                dbString
            ]);
            console.log('Query executed successfully:', insertRows);
        }
    } 
        catch (err) {
        console.error('Error executing SQL queries:', err);
    } 

    connection.end((err) => {
    if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
    }
    console.log('MySQL connection closed');
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});