import { Router } from "express";
import { AppDataSource } from "../index";
import { User } from "../entities/User";

const router = Router();

router.get("/", async (_, res) => {
  const users = await AppDataSource.getRepository(User).find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = AppDataSource.getRepository(User).create(req.body);
  const result = await AppDataSource.getRepository(User).save(user);
  res.json(result);
});

export default router;