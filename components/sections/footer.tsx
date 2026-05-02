import { PORTOFOLIO } from "@/lib/constant";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer({ year }: { year: number }) {
  const socials = [
    { label: "GitHub", icon: FaGithub, href: PORTOFOLIO.URL.GITHUB },
    { label: "LinkedIn", icon: FaLinkedin, href: PORTOFOLIO.URL.LINKEDIN },
    { label: "Email", icon: FaEnvelope, href: `mailto:${PORTOFOLIO.EMAIL}` },
  ];

  return (
    <footer className="border-t border-border py-8 bg-bg">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <p className="font-mono text-[0.7rem] text-text-3 tracking-[0.05em]">
          <span>©{year} </span> Aufa. Built with Love.
        </p>

        <div className="flex gap-1">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-text-3 transition-all duration-200 hover:-translate-y-0.5 hover:text-text p-2"
            >
              {s.icon && <s.icon className="w-4 h-4" />}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
