import express from "express";
import { APP_PORT, DB_URL, CLOUD_DB_URL } from "./config";
import routes from "./routes";
import mongoose from "mongoose";
import path from "path";

import cors from "cors";

// Database connection
mongoose.connect(CLOUD_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected...");
});

const app = express();

// global variable in node
global.appRoot = path.resolve(__dirname);

app.use(cors());

// for json validation
app.use(express.json());
// for form data validation
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use("/api", routes);

// serves static route of uploads
app.use("/uploads", express.static("uploads"));

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}.`));
