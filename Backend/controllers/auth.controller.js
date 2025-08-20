const db = require("../config/supabase");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Missing Google credential" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    let result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    let user;
    if (result.rows.length === 0) {
      const insertResult = await db.query(
        `INSERT INTO users (first_name, last_name, email, password) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [given_name, family_name, email, null]
      );
      user = insertResult.rows[0];
    } else {
      user = result.rows[0];
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user, message: "Google login successful" });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
  const { firstName, lastName, contactNo, email, password } = req.body;
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
      [firstName, lastName, contactNo, email, hashedPassword]
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

const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  const used = false;

  console.log(email);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const emailExist = await db.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (!emailExist) {
      return res.status(401).json({ error: "Email do not exist" });
    }

    const data = emailExist.rows[0];

    const token = await crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 15 * 60 * 1000;

    await db.query(
      "INSERT INTO reset_token (user_id, email, token, expires, used) VALUES ($1, $2, $3, $4, $5)",
      [data.id, email, token, expires, used]
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
    });

    res.status(200).json({ message: "Reset email sent" });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Check if token exists
    const tokenQuery = await db.query(
      `SELECT user_id, expires FROM reset_token WHERE token = $1`,
      [token]
    );

    if (tokenQuery.rows.length === 0) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const resetRequest = tokenQuery.rows[0];

    if (new Date(resetRequest.expires) < new Date()) {
      return res.status(400).json({ error: "Token has expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(`UPDATE users SET password = $1 WHERE id = $2`, [
      hashedPassword,
      resetRequest.user_id,
    ]);

    await db.query(`DELETE FROM reset_token WHERE token = $1`, [token]);

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  login,
  googleLogin,
  register,
  requestResetPassword,
  resetPassword,
};
