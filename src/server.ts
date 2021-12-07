import express from "express";

import connectDatabase from "./database";
import setupServerConfig from "./configs/serverConfig";

const port = process.env.NODE_ENV === "test" ? 5050 : process.env.PORT || 7000;
const app = express();
export const rootDirectory = __dirname;

const startServer = async () => {
  if (process.env.NODE_ENV !== "test") {
    await connectDatabase();
  }
  console.log(`Project is running at http://localhost:${port}`);
};

setupServerConfig(app);
