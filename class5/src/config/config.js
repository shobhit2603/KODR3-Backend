import dotenv from "dotenv";

dotenv.config();

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
}

// Config file is used to store environment variables and configuration settings for the application. 
// It uses the dotenv package to load environment variables from a .env file into process.env. 
// This allows you to keep sensitive information like database connection strings and API keys out of your source code and easily manage different configurations for development, testing, and production environments.