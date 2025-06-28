import cors from "cors";
import cookieParser from "cookie-parser";
import express, { type NextFunction, type Request, type Response } from "express";
import * as paymentController from "./controllers/payment-controller.js";

// create express app instance
const app = express();

// CORS middleware
app.use(cors());

// other middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/payment", paymentController.postPayment);

// error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

// export express app
export default app;
