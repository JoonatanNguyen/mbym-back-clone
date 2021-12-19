import express from "express";
import { Container } from "typedi";

const router = express.Router();

router.route("/test").get((req, res) => {
  return;
});

export default router;
