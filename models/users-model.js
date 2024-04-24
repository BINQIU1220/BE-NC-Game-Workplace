const db = require("../db/connection.js");
const bcrypt = require("bcrypt");

// TASK 6
exports.fetchAllUsers = () => {
  return db.query(`SELECT * FROM users;`).then((data) => {
    return data.rows;
  });
};

//add register functionality
const saltRounds = 10;

exports.userSignup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;

  try {
    const checkResultUsername = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [username]
    );
    const checkResultEmail = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkResultEmail.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else if (checkResultUsername.rows.length > 0) {
      res.send("Username already exists. Try logging in.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password: ", err);
        } else {
          await db.query(
            "INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4)",
            [username, name, email, hash]
          );
          res.send("Success~");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.userLogin = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPasswordHash = user.password;

      bcrypt.compare(password, storedPasswordHash, async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result) {
            res.send("logged in");
          } else {
            res.send("Incorrect Password");
          }
        }
      });
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
};
