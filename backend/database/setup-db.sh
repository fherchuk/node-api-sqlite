#!/bin/bash

# Define your SQLite database filename
DB_FILE="./newsletter.db"

# SQL commands to create tables
SQL_COMMANDS="
CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS newsletters (
    id INTEGER PRIMARY KEY,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"

# Create the SQLite database file
sqlite3 $DB_FILE <<EOF
$SQL_COMMANDS
EOF

echo "Database setup complete."