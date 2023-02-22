import dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  DEBUG_MODE,
  DB_URL,
  CLOUD_DB_URL,
  JWT_SECRET,
  REFRESH_SECRET,
  APP_URL,
} = process.env;
