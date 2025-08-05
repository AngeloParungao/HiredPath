const db = require("../config/supabase");

const createApplication = async (req, res) => {
  const { job_title, company, status, date_applied } = req.body;

  if (!job_title || !company || !status || !date_applied) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = `
      INSERT INTO applications (job_title, company, status, date_applied)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [job_title, company, status, date_applied];

    const result = await db.query(query, values);
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
    const query = `SELECT * FROM applications WHERE user_id = $1`;
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

module.exports = { createApplication, fetchApplications };
