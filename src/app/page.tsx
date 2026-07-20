import AiFeatures from "./components/home/ai-features";
import FeaturesSection from "./components/home/features-section";
import HeroSection from "./components/home/hero-section";
import HomeFaq from "./components/home/home-faq";
import HowItWorks from "./components/home/how-it-works";
import LearningCategories from "./components/home/learning-categories";
import ResourceInsights from "./components/home/resource-insights";


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <LearningCategories />
      <ResourceInsights />
      <HowItWorks />
      <AiFeatures />
      <HomeFaq />
    </main>
  );
}