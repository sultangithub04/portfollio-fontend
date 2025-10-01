import Image from "next/image";
import Navbar from "../../components/shared/Navbar";
import HeroSection from "../../components/shared/HeroSection";
import AchievementsSection from "../../components/shared/AchievementsSection";
import AboutSection from "../../components/shared/AboutSection";
import ProjectsSection from "../../components/shared/ProjectsSection";
import EmailSection from "../../components/shared/EmailSection";
import Footer from "../../components/shared/Footer";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col bg-[#121212] ">
  
        <div className="container mt-24 mx-auto px-12 py-4">
          <HeroSection />
          <AchievementsSection />
          <AboutSection/>
          <ProjectsSection />
          <EmailSection/>
        </div>
   
      </main>
  );
}
