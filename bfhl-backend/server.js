const express = require("express");
const app = express();
const port = process.env.PORT || 3001; // Ensure this matches your backend port

app.use(express.json());

// Enable CORS for all origins (for local testing)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (for local dev; tighten in production)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: data array is required",
      });
    }

    const numbers = data.filter((item) => !isNaN(item) && item !== "");
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    const highest_alphabet =
      alphabets.length > 0
        ? [
            alphabets
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
              .pop(),
          ]
        : [];

    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
