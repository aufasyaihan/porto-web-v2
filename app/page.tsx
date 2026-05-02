import {
  getAbout,
  getExperience,
  getProjects,
  getCertifications,
  getAwards,
  getEducation,
} from "@/lib/content";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Certifications from "@/components/sections/certifications";
import Awards from "@/components/sections/awards";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default async function Home() {
  const [about, experience, projects, certifications, awards, education] =
    await Promise.all([
      getAbout(),
      getExperience(),
      getProjects(),
      getCertifications(),
      getAwards(),
      getEducation(),
    ]);

  return (
    <main>
      <Hero name={about.name} />
      <About data={about} />
      <Experience data={experience} />
      <Projects data={projects} />
      <Certifications data={certifications} />
      <Awards data={awards} />
      <Education data={education} />
      <Contact />
      <Footer />
    </main>
  );
}
