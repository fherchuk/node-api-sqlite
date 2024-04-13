DB_FILE="./newsletter.db"

sqlite3 -csv $DB_FILE "SELECT * FROM subscribers;"
sqlite3 -csv $DB_FILE "SELECT * FROM newsletters;"