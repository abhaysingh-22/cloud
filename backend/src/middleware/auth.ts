import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing token" });
    }
    try {
        const payload = jwt.verify(header.slice(7), env.JWT_SECRET) as { sub: string };
        req.userId = payload.sub;
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}