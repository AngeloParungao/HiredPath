const db = require("../config/supabase");
const { createNotification } = require("../services/notification.service");

const createApplication = async (req, res) => {
  const { job_title, company, status, date_applied } = req.body;
  const user_id = req.user.id;

  if (!job_title || !company || !status || !date_applied) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = `
      INSERT INTO applications (user_id, job_title, company, status, date_applied)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [user_id, job_title, company, status, date_applied];

    const result = await db.query(query, values);

    await createNotification({
      user_id: user_id,
      heading: "Application",
      message: `Application for ${job_title} at ${company} added.`,
      is_read: false,
    });

    res.status(201).json({
      message: "Application created successfully",
      application: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchApplications = async (req, res) => {
  const id = req.params.id;
  try {
    const query = `SELECT * FROM applications WHERE user_id = $1 ORDER BY date_applied DESC`;
    const value = id;

    const result = await db.query(query, [value]);
    res.status(200).json({
      applications: result.rows,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateApplication = async (req, res) => {
  const { id } = req.params;
  const { status, interview_date } = req.body;
  const user_id = req.user.id;

  let query = "";
  const values = [id];

  try {
    const existing = await db.query(
      "SELECT * FROM applications WHERE id = $1",
      [id]
    );
    const details = existing.rows[0];

    if (status) {
      query = "UPDATE applications SET status = $1 WHERE id = $2";
      values.unshift(status);
    }

    if (interview_date) {
      query = "UPDATE applications SET interview_date = $1 WHERE id = $2";
      values.unshift(interview_date);
    }

    await db.query(query, values);

    await createNotification({
      user_id: user_id,
      heading: "Application Updated",
      message: `Application for ${details.job_title} at ${details.company} updated with status ${status}.`,
      is_read: false,
    });

    res.status(200).json({
      message: "Application updated successfully",
      application: {
        id,
        ...(status && { status }),
        ...(interview_date && { interview_date }),
      },
    });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteApplications = async (req, res) => {
  const { ids } = req.body;
  const user_id = req.user.id;

  try {
    const query = "DELETE from applications WHERE id = ANY($1)";

    await db.query(query, [ids]);

    await createNotification({
      user_id: user_id,
      heading: "Application Deleted",
      message: `Application(s) have been deleted.`,
      is_read: false,
    });

    res.status(200).json({ message: "Applications deleted successfully" });
  } catch (error) {
    console.error("Error deleting applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createApplication,
  fetchApplications,
  updateApplication,
  deleteApplications,
};
