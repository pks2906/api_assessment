import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify user JWT
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
  } 

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.locals.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Middleware to verify admin API key
export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};