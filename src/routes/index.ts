import express from "express";
import User from "./users";

export default (app: express.Application) => {
  app.use(User);
};
