const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();  //creates express application
dotenv.config();   // It loads environment variables from a ".env" file into the server's process.env object. This allows you to store configuration variables separate from your code.
connectDB();  //to establishes a connection to a database.

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors()); // Use this after the variable declaration. It applies the CORS middleware to the Express application. This allows the server to respond to cross-origin requests with the specified CORS options.

app.use(express.json()); // tell the server to accept the json data from frontend

// todo functions
app.use("/todo", todoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
