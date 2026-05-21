import FeaturesLeads from "@/sections/features-leads";
import FeaturesAutomation from "@/sections/features-automation";
import FeaturesBattlePlan from "@/sections/features-battleplan";
import FeaturesPageHeader from "@/sections/features-page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — Closer Intellect AI | AI Sales Enablement",
  description:
    "Explore Closer Intellect AI's powerful feature suite: AI Cold Lead Generation, Multi-Channel Follow-up Automation, and AI-Powered Battle Plans.",
};

export default function FeaturesPage() {
  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-14 sm:space-y-24 md:space-y-32 lg:space-y-40 scroll-smooth pb-20">
      <FeaturesPageHeader />
      <FeaturesLeads />
      <FeaturesAutomation />
      <FeaturesBattlePlan />
    </div>
  );
}
