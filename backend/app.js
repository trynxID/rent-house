const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./utils/db");

const usersRouter = require("./routes/users");
const propertiesRouter = require("./routes/properties");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const bookingsRouter = require("./routes/bookings");
const transactionsRouter = require("./routes/transactions");
const dashboardRouter = require("./routes/dashboard");

const port = process.env.PORT || 4573;
const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("tester API");
});

app.use("/api/users", usersRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/bookings", bookingsRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  const errorResponse = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };
  res.json(errorResponse);
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
