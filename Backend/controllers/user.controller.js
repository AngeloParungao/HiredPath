const db = require("../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user, message: "Login Successful" });
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({ error: "internal server error" });
  }
};

const register = async (req, res) => {
  const { first_name, last_name, contact_no, email, password } = req.body;
  try {
    const emailAvailable = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (emailAvailable.rows.length !== 0) {
      return res.status(401).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (first_name, last_name, contact_no, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, contact_no, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user, message: "Register Successful" });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login, register };
