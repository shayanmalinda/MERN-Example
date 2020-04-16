const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose database connected successfully");
});

const exerciseRouter = require("./routes/exercises.route");
const userRouter = require("./routes/users.route");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
});
