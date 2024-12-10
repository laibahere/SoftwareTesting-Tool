// database.js
const sqlite3 = require('sqlite3').verbose();

// Initialize SQLite Database
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database connected');
    }
});


// This function can be used to execute queries in the database
function queryDatabase(query, params = [], callback) {
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Error executing query', err);
        } else {
            callback(rows);
        }
    });
}


// Create Bug Report Table
db.run(`CREATE TABLE IF NOT EXISTS bugs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bugTitle TEXT,
    bugDescription TEXT,
    stepsToReproduce TEXT,
    expectedBehavior TEXT,
    browser TEXT,
    bugSeverity TEXT
)`);

// Create Users Table (for login)
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
)`);

// Export the database for use in other modules
module.exports = { db, queryDatabase };

// Log a message to indicate that the script ran
console.log("Database and tables created if they didn't exist.");