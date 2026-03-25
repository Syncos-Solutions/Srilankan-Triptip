
import Aboutsection from "@/components/Aboutsection";
import ShareAdventureSection from "@/components/ShareAdventureSection";
// import AboutUs from "@/components/About";
// import AmbianceSection from "@/components/AmbianceSection";
// import TestimonialsSection from "@/components/TestimonialsSection";
// import NewsArticlesSection from "@/components/NewsArticlesSection";
import FooterSection from "@/components/Footer";
import CustomPlanningSection from "@/components/CurrentProgramsSection";
import AdventureHero from "@/components/AdventureHero";
//import StatsHighlightSection from "@/components/StatsStrip";
//import TourPreparationSection from "@/components/FeatureTile";



export default function Home() {
  return (
    <main className="relative min-h-screen bg-primary-dark">
      < AdventureHero/>
      {/* <StatsHighlightSection /> */}
      
      <Aboutsection />
      <CustomPlanningSection />
      
      {/* <TourPreparationSection /> */}
      <ShareAdventureSection/>
      
      {/* <AboutUs/>
      <AmbianceSection />
      
      <TestimonialsSection />
      <NewsArticlesSection /> */}
      
      <FooterSection/>
    </main>
  );
}