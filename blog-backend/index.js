const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require('./routes/postRoutes');

dotenv.config({path: "./.env"});
const app = express();


app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

connectDB();


app.use("/test", (req,res) => {
  res.send("allow me to be tested");
});

app.use("/", routes);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
