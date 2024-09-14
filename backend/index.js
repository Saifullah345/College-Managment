const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// const corsOptions = {
//   origin: ["http://localhost:3001", "https://college-management1.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Use routes
app.use("/", Routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
