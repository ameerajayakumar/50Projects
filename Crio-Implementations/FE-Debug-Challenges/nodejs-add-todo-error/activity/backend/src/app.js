const express = require("express");
const routes = require("./routes/v1");
const mongoose = require("mongoose");
const captureDateMiddleware = require("./middleware/middleware");
const cors = require("cors");

const PORT=8082
const MONGODB_URL="mongodb://127.0.0.1:27017/todoapp"

const app = express();

app.use(cors());
app.use(express.json());

// NOTE - Uncomment in Milestone 5
// Middleware to log API request metadata
// app.use(captureDateMiddleware);

app.use("/v1", routes);

// Create a MongoDB connection using Mongoose
mongoose.connect(MONGODB_URL,  {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }).then(() => {
  console.log("Connected to MongoDB");

  // Start the Node server
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
