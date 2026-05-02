import {
  getAbout,
  getExperience,
  getProjects,
  getCertifications,
  getAwards,
  getEducation,
} from "@/lib/content";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Certifications from "@/components/certifications";
import Awards from "@/components/awards";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

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
