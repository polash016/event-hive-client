import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const envVariable = {
  base_api: process.env.EVENT_HIVE_API_URL,
};
