import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import * as admin from "firebase-admin";

dotenv.config();

import requestMiddleware from "../middlewares/RequestMiddleware";
import { rootDirectory } from "../server";

if (process.env.NODE_ENV !== "test") {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export default (app: express.Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/public", express.static(`${rootDirectory}/publi`));
  app.use(requestMiddleware);
};
