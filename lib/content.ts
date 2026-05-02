import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { AboutData } from "@/types/about";
import { ExperienceEntry } from "@/types/experiance";
import { ProjectEntry } from "@/types/project";
import { CertEntry } from "@/types/certificate";
import { AwardEntry } from "@/types/award";
import { EducationEntry } from "@/types/education";

const contentDir = path.join(process.cwd(), "content");

async function parseMarkdown(content: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(content);
  return result.toString();
}

export async function getAbout(): Promise<AboutData> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "about.md"), "utf-8");
  const { data, content } = matter(raw);
  const bodyHtml = await parseMarkdown(content);
  const about = data as Omit<AboutData, "bodyHtml">;
  const stats = about.stats ?? [
    { value: 6, label: "Years Exp.", suffix: "+" },
    { value: 40, label: "Projects Shipped", suffix: "+" },
    { value: about.skills.length, label: "Technologies", suffix: "" },
  ];

  return { ...about, stats, bodyHtml };
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "experience.md"), "utf-8");
  const { data } = matter(raw);
  return (data.experience ?? []) as ExperienceEntry[];
}

export async function getProjects(): Promise<ProjectEntry[]> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "projects.md"), "utf-8");
  const { data } = matter(raw);
  return (data.projects ?? []) as ProjectEntry[];
}

export async function getCertifications(): Promise<CertEntry[]> {
  "use cache";
  const raw = fs.readFileSync(
    path.join(contentDir, "certifications.md"),
    "utf-8"
  );
  const { data } = matter(raw);
  return (data.certifications ?? []) as CertEntry[];
}


export async function getAwards(): Promise<AwardEntry[]> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "awards.md"), "utf-8");
  const { data } = matter(raw);
  return (data.awards ?? []) as AwardEntry[];
}

export async function getEducation(): Promise<EducationEntry[]> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "education.md"), "utf-8");
  const { data } = matter(raw);
  return (data.education ?? []) as EducationEntry[];
}
