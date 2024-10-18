const express = require("express");
const app = express();
const cors = require("cors");
const { default: axios } = require("axios");

const PORT = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", "views");
app.set("view engine", "ejs");
app.use(
  cors({
    origin: "*", // Hoặc bạn có thể chỉ định nguồn gốc cụ thể
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Cập nhật hàm /login
app.post("/login", async (req, res) => {
  const { username, password } = req.body; // Lấy username và password từ request body

  try {
    const response = await axios.post("https://business.momo.vn/api/authentication/login?language=vi", {
      username,
      password,
    });
    
    // Trả lại phản hồi từ MoMo
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
