import Image from 'next/image'
import SectionRevealer from '../section-revealer'
import { CertEntry } from '@/types/certificate'
import { Award } from 'lucide-react'

export default function Certifications({ data }: { data: CertEntry[] }) {
  return (
    <section
      id="certifications"
      className="py-32 border-t border-border bg-surface"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionRevealer>
          <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3">
              04 - Certifications
            </p>
            <span className="font-mono text-[0.7rem] text-text-3">
              {data.length} credentials
            </span>
          </div>
        </SectionRevealer>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {data.map((cert, i) => (
            <SectionRevealer key={cert.name} delay={i * 0.07}>
              <CertCard cert={cert} />
            </SectionRevealer>
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({ cert }: { cert: CertEntry }) {
  return (
    <div
      className="group h-[220px]"
      style={{ perspective: '1000px' }}
      data-cursor="hover"
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 flex flex-col justify-between border border-border bg-card p-7 [backface-visibility:hidden]">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-border text-[1.2rem]">
            {cert.badge ? (
              <Image
                src={cert.badge}
                alt={cert.name}
                fill
                className="object-contain grayscale"
                sizes="40px"
              />
            ) : (
              <span aria-hidden>
                <Award />
              </span>
            )}
          </div>

          <div>
            <p className="mb-1.5 text-[0.95rem] font-semibold leading-[1.3] tracking-[-0.01em]">
              {cert.name}
            </p>
            <p className="font-mono text-[0.72rem] tracking-[0.05em] text-text-3">
              {cert.issuer}
            </p>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-between bg-text p-7 text-bg [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div>
            <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bg/50">
              Certified
            </p>
            <p className="mb-2 text-base font-bold leading-[1.2] tracking-[-0.02em]">
              {cert.name}
            </p>
            <p className="text-[0.8rem] text-bg/60">{cert.issuer}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.7rem] text-bg/50">
              {cert.date}
            </span>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-bg/40 pb-[1px] font-mono text-[0.68rem] uppercase tracking-[0.08em] text-bg focus:border-bg focus:outline-none"
              >
                Verify ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
