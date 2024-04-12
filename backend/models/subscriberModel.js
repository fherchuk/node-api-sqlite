const sqlite3 = require("sqlite3").verbose();

const dbPath = "./database/newsletter.db";

class Subscriber {
  // Ensure there's only one database connection instance
  static #db = null;

  static #initializeDB() {
    if (!Subscriber.#db) {
      Subscriber.#db = new sqlite3.Database(dbPath);
      console.log("Database connection initialized");
    }
  }

  //Create
  static async post(email, name) {
    Subscriber.#initializeDB();
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO subscribers (email, name) VALUES (?, ?)";

      Subscriber.#db.run(sql, [email, name], function (err) {
        if (err) {
          reject(err);
        } else {
          const id = this.lastID;
          const values = { id, email, name };
          resolve(values);
        }
      });
    });
  }

  //Read
  static get(id) {
    Subscriber.#initializeDB();
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM subscribers WHERE id = ?`;

      Subscriber.#db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static getAll() {
    Subscriber.#initializeDB();
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM subscribers";

      Subscriber.#db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  //Update
  static update(id, email, name) {
    Subscriber.#initializeDB();
    return new Promise((resolve, reject) => {
      const sql = `UPDATE subscribers SET email = ?, name = ? WHERE id = ?`;

      Subscriber.#db.run(sql, [email, name, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, email, name });
        }
      });
    });
  }

  //Delete
  static delete(id) {
    Subscriber.#initializeDB();
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM subscribers WHERE id = ?";

      Subscriber.#db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes > 0) {
            resolve(id);
          } else {
            reject(new Error(`Subscriber with ID ${id} not found`));
          }
        }
      });
    });
  }
}

module.exports = Subscriber;
