import axios from "axios";
import broadcastMail from "../middlewares/sendMail.js";
export const broadcastToLoggedInUsers = async (req, res) => {
  try {
    const { subject, title, message } = req.body;

    if (!subject || !title || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Fetch the list of logged-in users from the existing API
    const response = await axios.get(`http://localhost:5000/api/users`, {
      headers: {
        token: req.headers.token,
      },
    });

    const users = response.data?.users || [];

    if (!users.length) {
      return res.status(404).json({ success: false, message: "No logged-in users found." });
    }

    // Send emails to all users
    const emailPromises = users.map((user) =>
      broadcastMail(user.email, subject, {
        name: user.name || "User",
        title,
        message,
      })
    );

    await Promise.all(emailPromises);

    res.status(200).json({ success: true, message: "Message broadcasted successfully to all users." });
  } catch (error) {
    console.error("Error broadcasting messages:", error);
    res.status(500).json({ success: false, message: "Failed to send messages." });
  }
};
