// loadEnv.js
import fs from "fs";
import dotenv from "dotenv";

// Determine the environment and load the appropriate .env file
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config(); // Fallback to default .env if no specific file is found
}

// Log the current environment
console.log(`Running in ${process.env.NODE_ENV} mode`);
