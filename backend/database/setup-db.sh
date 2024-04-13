#!/bin/bash

# Running this script will create a default SQLite database with tables and default values.
# Can also be used to delete the current DB in the directory and replace it.

DB_FILE="./newsletter.db"

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
    INSERT INTO subscribers (email, name) VALUES ('testemail1@gmail.com', 'ADMIN' );
    INSERT INTO subscribers (email, name) VALUES ('testemail2@testmail.com', 'TEST-ACC' );"

initialize_database() {
    if [ -f "$DB_FILE" ]; then
        read -p "Database file already exists. Do you want to delete it and create a new one? (y/n): " answer
        case "$answer" in
            [Yy]* )
                rm "$DB_FILE"
                echo "Existing database deleted."
                ;;
            * )
                echo "Exiting..."
                exit 0
                ;;
        esac
    fi

    touch "$DB_FILE"
    sqlite3 "$DB_FILE" <<EOF
    $SQL_COMMANDS
EOF
    echo "Database setup complete."
    sqlite3 -csv "$DB_FILE" "SELECT * FROM subscribers;"
}

initialize_database

