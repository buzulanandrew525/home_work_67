const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI);


mongoose.connection.once("open", () => {
  console.log("✅ Подключено к MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Ошибка подключения к MongoDB:", err);
});

// Пример модели Mongoose
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
}));

// Роуты
app.get("/", (req, res) => {
  res.send("Привет из Express в Docker!");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${port}`);
});