import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "content");

async function parseMarkdown(content: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(content);
  return result.toString();
}

// ─── About ──────────────────────────────────────────────────────────
export interface AboutData {
  name: string;
  title: string;
  location: string;
  available: boolean;
  bio: string;
  photo: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
    twitter?: string;
  };
  bodyHtml: string;
}

export async function getAbout(): Promise<AboutData> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "about.md"), "utf-8");
  const { data, content } = matter(raw);
  const bodyHtml = await parseMarkdown(content);
  return { ...(data as Omit<AboutData, "bodyHtml">), bodyHtml };
}

// ─── Experience ──────────────────────────────────────────────────────
export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "experience.md"), "utf-8");
  const { data } = matter(raw);
  return (data.experience ?? []) as ExperienceEntry[];
}

// ─── Certifications ──────────────────────────────────────────────────
export interface CertEntry {
  name: string;
  issuer: string;
  date: string;
  badge?: string;
  credentialUrl?: string;
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

// ─── Awards ─────────────────────────────────────────────────────────
export interface AwardEntry {
  title: string;
  organization: string;
  year: string;
  logo?: string;
  description: string;
}

export async function getAwards(): Promise<AwardEntry[]> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "awards.md"), "utf-8");
  const { data } = matter(raw);
  return (data.awards ?? []) as AwardEntry[];
}

// ─── Education ───────────────────────────────────────────────────────
export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  logo?: string;
  description: string;
}

export async function getEducation(): Promise<EducationEntry[]> {
  "use cache";
  const raw = fs.readFileSync(path.join(contentDir, "education.md"), "utf-8");
  const { data } = matter(raw);
  return (data.education ?? []) as EducationEntry[];
}
