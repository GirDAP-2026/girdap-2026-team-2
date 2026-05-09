import cors from "cors";
import express from "express";
import { modulesRouter } from "./routes/modules.js";
import { getCompaniesList } from "./services/aiEngine.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "odeal-ai-demo-api" });
});

app.get("/api/companies", (_req, res) => {
  res.json(getCompaniesList());
});

app.use("/api/modules", modulesRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Beklenmeyen bir hata olustu." });
});

export { app };
