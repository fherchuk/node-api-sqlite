DB_FILE="./newsletter.db"

#sqlite3 $DB_FILE <<EOF
#INSERT INTO subscribers (id, email, name) VALUES (002, 'fherchuk@uri.edu', 'Rick' );
#EOF

# Run SQLite query and output results to CSV



sqlite3 -csv $DB_FILE "SELECT * FROM subscribers;"
sqlite3 -csv $DB_FILE "SELECT * FROM newsletters;"