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
import { PORTOFOLIO } from "@/lib/constant";
import { getCurrentYear } from "@/lib/dates";

export default async function Home() {
  const [about, experience, projects, certifications, awards, education, year] =
    await Promise.all([
      getAbout(),
      getExperience(),
      getProjects(),
      getCertifications(),
      getAwards(),
      getEducation(),
      getCurrentYear(),
    ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    jobTitle: about.title,
    url: PORTOFOLIO.SITE_URL,
    image: `${PORTOFOLIO.SITE_URL}${about.photo}`,
    email: `mailto:${PORTOFOLIO.EMAIL}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressRegion: about.location,
    },
    sameAs: [about.socials.github, about.socials.linkedin].filter(Boolean),
    knowsAbout: about.skills,
    worksFor: experience[0]
      ? {
          "@type": "Organization",
          name: experience[0].company,
        }
      : undefined,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero name={about.name} year={year} />
      <About data={about} />
      <Experience data={experience} />
      <Projects data={projects} />
      <Certifications data={certifications} />
      <Awards data={awards} />
      <Education data={education} />
      <Contact />
      <Footer year={year} />
    </main>
  );
}
