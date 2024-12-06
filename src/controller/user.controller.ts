import { Request, Response } from "express";
import { db } from "../../lib/db";

export const getTrains = async (req: Request, res: Response) => {
  try {
    const { source, destination } = req.query;
    const trains = await db.train.findMany({
      where: { source: String(source), destination: String(destination) },
    });
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trains" });
  }
};

export const bookSeat = async (req: Request, res: Response) => {
    const { trainId } = req.body;
    const userId = res.locals.user.id; 

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const train = await db.train.findUnique({ where: { id: trainId } });

    if (!train || train.availableSeats <= 0) {
        res.status(400).json({ message: "No seats available" });
        return;
    }

    const booking = await db.$transaction(async (tx) => {
      const updatedTrain = await tx.train.update({
        where: { id: trainId },
        data: { availableSeats: { decrement: 1 } },
      });

      return tx.booking.create({
        data: { trainId, userId, seatNumber: updatedTrain.totalSeats - updatedTrain.availableSeats },
      });
    });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error booking seat" });
  }
};

export const getBookingDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await db.booking.findUnique({
      where: { id: Number(id) },
      include: { train: true, user: true },
    });

    if (!booking) {
        res.status(404).json({ message: "Booking not found" });
        return;
    } 

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking details" });
  }
};