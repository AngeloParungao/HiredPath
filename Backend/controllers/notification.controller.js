const db = require("../config/supabase");

const fetchNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM notifications WHERE user_id = $1";
    const value = [id];

    const result = await db.query(query, value);

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

module.exports = { fetchNotification };
