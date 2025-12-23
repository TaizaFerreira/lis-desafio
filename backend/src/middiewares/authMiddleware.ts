import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  profile: string;
}

export const authMiddleware = (allowedProfiles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "chave_secreta") as JwtPayload;

      if (!allowedProfiles.includes(decoded.profile)) {
        return res.status(403).json({ message: "Perfil não autorizado" });
      }

      // Armazena info do usuário na requisição
      (req as any).user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  };
};
