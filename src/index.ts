import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import cors from "cors";
const app = express();
const port = 3003;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send("Server up and running");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});