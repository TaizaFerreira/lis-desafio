import { Router } from "express";
import { AppDataSource } from "../index";
import { Lead } from "../entities/Lead";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const leadRepository = AppDataSource.getRepository(Lead);
    const lead = leadRepository.create(req.body);
    await leadRepository.save(lead);
    return res.status(201).json(lead);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar lead" });
  }
});

router.get("/", async (_, res) => {
  const leads = await AppDataSource.getRepository(Lead).find();
  return res.json(leads);
});

export default router;
