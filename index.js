const express = require("express");
const { userRouter } = require("./routes/userRouter");
const connection = require("./db");
const { noteRouter } = require("./routes/noteRoute");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

app.use("/notes", noteRouter);

app.listen(8080, async (req, res) => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log("Server running on port 8080");
  } catch (error) {
    res.send({ error: error });
  }
});
