import { Router } from "express";
import {
  getCampaignModule,
  getCashflowModule,
  getInsightPanel,
  getRetentionModule,
  getVoiceAnswer,
  getVoiceBootstrap,
} from "../services/aiEngine.js";
import { voiceBodySchema } from "../schemas/moduleSchemas.js";

const modulesRouter = Router();

modulesRouter.get("/insight", (req, res) => {
  res.json(getInsightPanel(req.query.companyId));
});

modulesRouter.get("/cashflow", (req, res) => {
  res.json(getCashflowModule(req.query.companyId));
});

modulesRouter.get("/retention", (req, res) => {
  res.json(getRetentionModule(req.query.companyId));
});

modulesRouter.get("/campaign", (req, res) => {
  res.json(getCampaignModule(req.query.companyId));
});

modulesRouter.get("/voice/bootstrap", (req, res) => {
  res.json(getVoiceBootstrap(req.query.companyId));
});

modulesRouter.post("/voice", (req, res) => {
  const validation = voiceBodySchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Gecersiz istek govdesi",
      errors: validation.error.flatten(),
    });
  }

  const { question, companyId } = validation.data;
  return res.json(getVoiceAnswer(companyId, question));
});

export { modulesRouter };
