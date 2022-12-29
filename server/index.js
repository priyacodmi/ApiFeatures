const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const questionRouter = require("./router/questionRoter");
const roleRouter = require("./router/roleRouter");
const trailRouter = require("./router/trailsRouter");
const resultRouter = require("./router/resultRouter");

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://mcq-react.herokuapp.com",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};


//configure cors
app.use(cors(corsOptions));

//configure express to receive form data from client
app.use(express.json());

//dotEnv Configuration
dotEnv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

//mongodb configuration
mongoose
  .connect(process.env.MONGO_DB_CLOUD_URL)
  .then(() => {
    console.log("Connected to MongoDB Successfully....");
  })
  .catch((err) => {
    console.error("Error connecting to Mongo", err);
  });

//router configuration

app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/question", questionRouter);
app.use("/api/trails", trailRouter);
app.use("/api/result", resultRouter);


//simple URL
app.get("/", (req, res) => {
  res.send(`<h2>Welcome to Our Quiz App</h2>`);
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

app.listen(port, () => {
  console.log("Express Server is Started", port);
});
