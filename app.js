const pool = require("./db.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());


app.post("/login", async (req, res) => {
 try {
 const { username, password } = req.body;
 if (!username || !password) {
 return res
 .status(404)
 .json({ message: "Username and Password is mandatory" });
 } else {
 const query = "SELECT * FROM users WHERE username = ? and password = ?";
 const [rows] = await pool.query(query, [username, password]);
 if (rows.length === 0) {
 return res.status(404).json({ message: "User does not exist" });
 } else {
 const user = rows[0];
 const payload = { id: user.id, email: user.email, role: user.role };
 const token = jwt.sign(payload, process.env.SECRET_KEY, {
 expiresIn: "1h",
 });
 res.json({ token });
 }
 }
 } catch (err) {
 console.error(err);
 res.status(500).json({ message: "An error occured" });
 }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Application is running http://localhost:${process.env.PORT}`);
});