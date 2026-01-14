import dotenv from "dotenv";
dotenv.config();

export const validateEnv = () => {
  const required = ["MONGODB_URI", "PORT"];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Critical Error: Environment variable ${key} is missing`);
    }
  }
  console.log("Environment variables validated");
};