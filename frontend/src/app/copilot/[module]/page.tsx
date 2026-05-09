import { notFound } from "next/navigation";
import CopilotDemo from "../../components/CopilotDemo";
import { isModuleKey } from "@/lib/ai-modules";

type PageProps = {
  params: Promise<{ module: string }>;
};

export default async function CopilotModulePage({ params }: PageProps) {
  const { module } = await params;
  if (!isModuleKey(module)) notFound();
  return <CopilotDemo routeModule={module} />;
}
