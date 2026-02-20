const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/api/search", async (req, res) => {
  try {
    const { query, page } = req.query;

    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query,
          page,
          per_page: 12,
          client_id: process.env.UNSPLASH_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
  console.log("FULL ERROR:", error.response?.data || error.message);
  res.status(500).json({ 
    error: error.response?.data || error.message 
  });
}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});