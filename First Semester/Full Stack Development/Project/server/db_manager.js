const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.join(__dirname, "./database", "anti_brutus.sqlite");
const fs = require("fs");

class DatabaseManager {
  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.initializeDatabase();
    this.query_result = null;
  }

  initializeDatabase() {
    const createTableQuery = fs.readFileSync(
      path.join(__dirname, "./database", "create_tables.sql"),
      "utf8",
    );
    this.db.exec(createTableQuery, (err) => {
      if (err) {
      } else {
      }
    });
  }

  async checkUser(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users where email = ? ";

      this.db.get(query, [email], (err, row) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          if (row) {
            resolve(row); // Resolve with true if the user exists
          } else {
            resolve(false); // Resolve with false if the user doesn't exist
          }
        }
      });
    });
  }

  async test(callback) {
    const query = `
			drop table passwords  
		`;
    this.db.all(query, (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  async addDefaultVaults(email) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO vaults (vault_name, vault_description, user_email) VALUES (?, ?, ?), (?, ?, ?);`;
      this.db.run(
        query,
        [
          "Favorites",
          "Your favorite Passwords",
          email,
          "Passwords",
          "Your Passwords",
          email,
        ],
        (err) => {
          if (err) {
            reject(err); // Reject with the error if there's an issue with the query
          } else {
            resolve(true); // Resolve with true if the user exists
          }
        },
      );
    });
  }

  async insertUser(email, password, UserName, salt, DEK) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (email, password, UserName, salt,DEK)
            VALUES (?,?,?,?,?)`;

      this.db.run(
        query,
        [email, password, UserName, salt, DEK],
        async (err) => {
          if (err) {
            reject(err); // Reject with the error if there's an issue with the query
          } else {
            const added_vaults = await this.addDefaultVaults(email);
            if (added_vaults) {
              resolve(true); // Resolve with true if the user inserted
            } else {
              reject("Error adding default vaults");
            }
          }
        },
      );
    });
  }

  async reset_password(email, password) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users SET password = ? WHERE email = ?`;
      this.db.run(query, [password, email], (err) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          resolve(true); // Resolve with true if password updated successfully
        }
      });
    });
  }

  async add_vault_data(
    vaultid,
    user_id,
    pass_name,
    username,
    password,
    url,
    description,
    icon,
  ) {
    return new Promise((resolve, reject) => {
      const query = `Insert into passwords
	  		(			
				user_id,
				vault_id,
				website_url,
				description,
				password,
				username,
				pass_name,
				icon,
				pass_date
				) values (?,?,?,?,?,?,?,?,DATE('now'))  
			`;

      this.db.run(
        query,
        [
          user_id,
          vaultid,
          url,
          description,
          password,
          username,
          pass_name,
          icon,
        ],
        (err) => {
          if (err) {
            reject(err); // Reject with the error if there's an issue with the query
          } else {
            resolve(true); // Resolve with true if the user exists
          }
        },
      );
    });
  }

  async update_vault_data(
    vaultid,
    pass_id,
    pass_name,
    username,
    password,
    url,
    description,
    icon,
  ) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE passwords SET 
				pass_name = ?,
				username = ?,
				password = ?,
				website_url = ?,
				description = ?,
				icon = ?,
				pass_date = DATE('now')
				WHERE vault_id = ? AND pass_id = ?`;
      this.db.run(
        query,
        [
          pass_name,
          username,
          password,
          url,
          description,
          icon,
          vaultid,
          pass_id,
        ],
        (err) => {
          if (err) {
            reject(err); // Reject with the error if there's an issue with the query
          } else {
            resolve(true); // Resolve with true if the user exists
          }
        },
      );
    });
  }

  async add_vault(vault_name, vault_description, user_email) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO vaults (vault_name, vault_description, user_email) VALUES (?, ?, ?)`;

      this.db.run(query, [vault_name, vault_description, user_email], (err) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          resolve(true); // Resolve with true if the user exists
        }
      });
      // Other methods...
    });
  }

  async get_vaults(user_email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM vaults WHERE user_email = ?`;

      this.db.all(query, [user_email], (err, rows) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          resolve(rows); // Resolve with data if the user exists
        }
      });
    });
  }

  async get_vault_data(vault_id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM passwords WHERE vault_id = ?`;

      this.db.all(query, [vault_id], (err, rows) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          resolve(rows); // Resolve with data if the user exists
        }
      });
    });
  }

  async delete_vault_data(pass_id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM passwords WHERE pass_id = ?`;

      this.db.run(query, [pass_id], (err) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          resolve(true); // Resolve with data if the user exists
        }
      });
    });
  }

  async delete_vault(vault_id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM vaults WHERE vault_id = ?`;

      this.db.run(query, [vault_id], (err) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          resolve(true); // Resolve with data if the user exists
        }
      });
    });
  }

  async get_no_of_passwords(user_id) {
    return new Promise((resolve, reject) => {
      const query = `select count(*) as count from passwords where user_id = ?`;

      this.db.all(query, [user_id], (err, rows) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          resolve(rows); // Resolve with data if the user exists
        }
      });
    });
  }

  async get_no_of_vaults(user_email) {
    return new Promise((resolve, reject) => {
      const query = `select count(*) as count from vaults where user_email = ?`;

      this.db.all(query, [user_email], (err, rows) => {
        if (err) {
          reject(err); // Reject with the error if there's an issue with the query
        } else {
          resolve(rows); // Resolve with data if the user exists
        }
      });
    });
  }
}
var dbobj = new DatabaseManager();

module.exports = dbobj;
