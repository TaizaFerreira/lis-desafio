import { Router } from "express";
import { AppDataSource } from "../index";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: user.id, profile: user.profile },
      process.env.JWT_SECRET || "chave_secreta",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor", error });
  }
});

export default router;
