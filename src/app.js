const express = require("express");
const app = express();

const recordRoutes = require("./routes/recordRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const userRoutes=require("./routes/userRoutes")
const mockAuth = require("./middlewares/mockAuth");
const authRoutes=require("./routes/authRoutes");

app.use(express.json());
// app.use(mockAuth);

// app.get("/",async (req, res) => {res.send({"hello":"bye"})})
app.use("/records", recordRoutes);
app.use("/summary", summaryRoutes);
app.use("/user", userRoutes);
app.use("/login",authRoutes);

module.exports = app;