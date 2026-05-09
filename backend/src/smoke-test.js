import request from "supertest";
import { app } from "./app.js";

async function run() {
  const health = await request(app).get("/health");
  if (health.statusCode !== 200 || !health.body.ok) {
    throw new Error("Health endpoint failed");
  }

  const companyList = await request(app).get("/api/companies");
  if (companyList.statusCode !== 200 || !companyList.body.companies?.length) {
    throw new Error("Companies endpoint failed");
  }

  const cid = companyList.body.companies[0].id;

  const insight = await request(app).get("/api/modules/insight").query({ companyId: cid });
  if (insight.statusCode !== 200 || !insight.body.headline || insight.body.company?.id !== cid) {
    throw new Error("Insight endpoint failed");
  }

  const voice = await request(app).post("/api/modules/voice").send({
    question: "Bu hafta en cok ne sattim?",
    companyId: cid,
  });
  if (voice.statusCode !== 200 || !voice.body.answer) {
    throw new Error("Voice endpoint failed");
  }

  console.log("API smoke tests passed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
