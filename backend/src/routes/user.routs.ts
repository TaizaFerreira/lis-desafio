import { Router } from "express";
import { AppDataSource } from "../index";
import { User } from "../entities/User";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

router.get("/", async (_, res) => {
  const users = await AppDataSource.getRepository(User).find();
  return res.json(users);
});

export default router;
