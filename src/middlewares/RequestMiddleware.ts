import express from "express";

export default (
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Origin", "*");

  next();
};
