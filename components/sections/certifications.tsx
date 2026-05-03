import SectionRevealer from '../section-revealer'
import { CertEntry } from '@/types/certificate'
import CertCard from './certification/cert-card'

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
