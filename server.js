// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { db, queryDatabase } = require('./database'); // Import database

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Example of querying the database
queryDatabase("SELECT * FROM users", [], (rows) => {
    console.log(rows);
});

// Endpoint to register a new user
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password], function(err) {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.status(200).send({ message: 'User registered successfully', id: this.lastID });
    });
});

// Endpoint to login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        if (!row) {
            return res.status(401).send('Invalid credentials');
        }
        res.status(200).send({ message: 'Login successful', user: row });
    });
});

// Endpoint to submit a bug report
app.post('/submit-bug', (req, res) => {
    const { bugTitle, bugDescription, stepsToReproduce, expectedBehavior, browser, bugSeverity } = req.body;
    db.run(`INSERT INTO bugs (bugTitle, bugDescription, stepsToReproduce, expectedBehavior, browser, bugSeverity) VALUES (?, ?, ?, ?, ?, ?)`,
        [bugTitle, bugDescription, stepsToReproduce, expectedBehavior, browser, bugSeverity], function (err) {
            if (err) {
                return res.status(500).send('Error submitting bug');
            }
            res.status(200).send({ message: 'Bug submitted successfully', id: this.lastID });
        });
});

// Endpoint to get all bugs
app.get('/bugs', (req, res) => {
    db.all(`SELECT * FROM bugs`, [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error retrieving bugs');
        }
        res.status(200).json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
