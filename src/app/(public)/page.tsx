import Image from "next/image";
import Navbar from "../../components/shared/Navbar";
import HeroSection from "../../components/shared/HeroSection";
import AchievementsSection from "../../components/shared/AchievementsSection";
import AboutSection from "../../components/shared/AboutSection";
import ProjectsSection from "../../components/shared/ProjectsSection";
import EmailSection from "../../components/shared/EmailSection";
import BlogCard from "@/components/modules/Blogs/BlogCard";


export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`)
  const { data: blogs } = await res.json()
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] ">

      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <div>
          <h2 className="text-center my-5 text-4xl font-bold text text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Featured Posts</h2>
          <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
            {blogs.data?.slice(0, 3).map((blog: any) => (<BlogCard key={blog?.id} post={blog} />))}
          </div>
        </div>
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>

    </main>
  );
}
