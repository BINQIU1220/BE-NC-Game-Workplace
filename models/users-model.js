const db = require("../db/connection.js");

// TASK 6
exports.fetchAllUsers = () => {
  return db.query(`SELECT * FROM users;`).then((data) => {
    return data.rows;
  });
};

//add register functionality

exports.userSignup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  try {
    const checkResult = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (checkResult.rows.length > 0) {
      res.send("Username already exists. Try logging in.");
    } else {
      await db.query(
        "INSERT INTO users (username, name, password) VALUES ($1, $2, $3)",
        [username, name, password]
      );
      res.send("Success~");
    }
  } catch (error) {
    console.log(error);
  }
};
