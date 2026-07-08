import { WelcomePopup } from "@/components/home/WelcomePopup";
import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedPuppies } from "@/components/home/FeaturedPuppies";
import { MeetParents } from "@/components/home/MeetParents";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AdoptionProcess } from "@/components/home/AdoptionProcess";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { ScallopDivider } from "@/components/shared/ScallopDivider";

export default function Home() {
  return (
    <>
      <WelcomePopup />
      <Hero />
      <WhyChooseUs />
      <ScallopDivider color="var(--color-cream)" />
      <FeaturedPuppies />
      <MeetParents />
      <ScallopDivider color="var(--color-cream)" />
      <TestimonialsSection />
      <AdoptionProcess />
      <FAQSection />
      <CTASection />
    </>
  );
}

