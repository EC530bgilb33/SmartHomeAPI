const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/smarthome.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    }
    else {
        console.log('Connected to the SQLite database.');

        db.run(`PRAGMA foreign_keys = ON;`);

        db.run (`CREATE TABLE IF NOT EXISTS users (
            UserID INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL,
            Email TEXT UNIQUE NOT NULL,
            Password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.log('Error creating users table:', err.message);
            }
        });

        db.run (`CREATE TABLE IF NOT EXISTS homes (
            HouseID INTEGER PRIMARY KEY AUTOINCREMENT,
            UserID INTEGER NOT NULL,
            Address TEXT NOT NULL,
            FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.log('Error creating homes table:', err.message);
            }
        });

        db.run (`CREATE TABLE IF NOT EXISTS rooms (
            RoomID INTEGER PRIMARY KEY AUTOINCREMENT,
            HouseID INTEGER NOT NULL,
            RoomType TEXT NOT NULL,
            FOREIGN KEY (HouseID) REFERENCES homes(HouseID) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.log('Error creating rooms table:', err.message);
            }
        });

        db.run (`CREATE TABLE IF NOT EXISTS devices (
            DeviceID INTEGER PRIMARY KEY AUTOINCREMENT,
            RoomID INTEGER NOT NULL,
            DeviceType TEXT NOT NULL,
            FOREIGN KEY (RoomID) REFERENCES rooms(RoomID) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.log('Error creating devices table:', err.message);
            }
        });

    }
});

module.exports = db;