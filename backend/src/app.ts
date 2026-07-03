import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config/index.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: config.clientOrigin }));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "IoT Office Monitoring API is running",
  });
});

app.use(globalErrorHandler);

export default app;
