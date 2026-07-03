import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config/index.js";
import { globalErrorHandler } from "./core/middleware/globalErrorHandler.js";
import { notFound } from "./core/middleware/notFound.js";
import { apiRouter } from "./routes/index.js";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: config.clientOrigin }));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "IoT Office Monitoring API is running",
  });
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
