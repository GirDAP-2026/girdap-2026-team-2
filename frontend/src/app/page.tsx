import { redirect } from "next/navigation";
import { copilotModulePath, DEFAULT_AI_MODULE } from "@/lib/ai-modules";

export default function Home() {
  redirect(copilotModulePath(DEFAULT_AI_MODULE));
}
