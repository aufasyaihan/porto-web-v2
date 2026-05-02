export const PORTOFOLIO = {
  NAME: "Aufa Syaihan Azzahidi",
  EMAIL: "aufa.azzahidi@gmail.com",
  ROLE: "Web Developer",
  LOCATION: "Indonesia",
  SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://aufasyaihan.dev"),
  URL: {
    GITHUB: "https://github.com/aufasyaihan",
    LINKEDIN: "https://www.linkedin.com/in/aufa-syaihan-azzahidi/",
  },
};
