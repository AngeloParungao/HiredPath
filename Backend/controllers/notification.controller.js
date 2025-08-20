const { pool } = require("../config/supabase");

const fetchNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM notifications WHERE user_id = $1";
    const value = [id];

    const result = await pool.query(query, value);

    res.status(200).json({
      message: "Notifications fetched successfully",
      notifications: result.rows,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const updateNotificationRead = async (req, res) => {
  const { id } = req.params;
  try {
    const query =
      "UPDATE notifications SET is_read = true WHERE is_read = false AND user_id = $1 RETURNING *";

    const result = await pool.query(query, [id]);
    res.status(200).json({
      message: "Notifications updated successfully",
      notifications: result.rows,
    });
  } catch (error) {
    console.error("Error updating notification read", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { fetchNotification, updateNotificationRead };
