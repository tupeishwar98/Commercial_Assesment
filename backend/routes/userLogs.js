const express = require("express");
const router = express.Router();
const UserLog = require("../models/UserLog");

router.get("/user-logs/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userLogs = await UserLog.find({ userId }).sort({ timestamp: -1 });

    return res.json({ userLogs });
  } catch (error) {
    console.error("Error fetching user logs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
