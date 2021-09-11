import express from "express";
import BaseRouter from "./routes/index";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Add APIs
app.use("/api", BaseRouter);

// Export express instance
export default app;
