import HeroSection from "@/components/HeroSection/HeroSection";
import OurMission from "@/components/OurMission";
import FactoryShowcase from "@/components/FactoryShowcase/FactoryShowcase";
import { Testimonial } from "@/components/Testimonial.jsx/Testimonial";
import { ContactNowSection } from "@/components/ContactNowSection";
import TrustedBy from "@/components/TrustedBy";

export default function Home() {
  return (
    <div className="bg-neutral-900">
      <HeroSection />
      {/* <OurMission /> */}
      {/* <MaterialShowcase /> */}
      {/* <FactoryShowcase /> */}
      {/* <TrustedBy /> */}
      {/* <Testimonial /> */}
      <ContactNowSection />
    </div>
  );
}
