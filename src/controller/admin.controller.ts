import { Request, Response } from "express";
import { db } from "../../lib/db";

export const addTrain = async (req: Request, res: Response) => {
  try {
    const { name, source, destination, totalSeats } = req.body;
    const train = await db.train.create({
      data: { name, source, destination, totalSeats, availableSeats: totalSeats },
    });
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: "Error adding train" });
  }
};