import express from "express";
import { APP_PORT, CLOUD_DB_URL } from "./config/index.js";
import routes from "./routes/index.js";
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
const PORT = process.env.PORT || APP_PORT;
// global variable in node
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

global.appRoot = path.resolve(__dirname);

const corsOptions = {
  origin: "https://pizza-react-cart.netlify.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// for json validation
app.use(express.json());
// for form data validation
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use("/api", routes);

// serves static route of uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
