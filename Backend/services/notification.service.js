const { pool } = require("../config/supabase");

const createNotification = async ({ user_id, heading, message, is_read }) => {
  try {
    const query = `
      INSERT INTO notifications (user_id, heading, message, is_read)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [user_id, heading, message, is_read];

    await pool.query(query, values);
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

module.exports = {
  createNotification,
};
