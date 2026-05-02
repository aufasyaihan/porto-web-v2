import Image from 'next/image'
import SectionRevealer from '../section-revealer'
import { AwardEntry } from '@/types/award'

export default function Awards({ data }: { data: AwardEntry[] }) {
  return (
    <section id="awards" className="py-32 border-t border-border bg-bg">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionRevealer>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-3 mb-16">
            05 - Awards &amp; Recognition
          </p>
        </SectionRevealer>

        <div className="flex flex-col">
          {data.map((award, i) => (
            <SectionRevealer key={award.title} delay={i * 0.1}>
              <article
                className="group grid grid-cols-[60px_1fr] items-start gap-6 border-b border-border py-10 cursor-default md:grid-cols-[80px_1fr] md:gap-10"
                data-cursor="hover"
              >
                <div>
                  <span className="font-mono text-4xl font-light leading-none tracking-[-0.04em] text-text-3 md:text-5xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {award.logo && (
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden">
                          <Image
                            src={award.logo}
                            alt={award.organization}
                            fill
                            className="object-contain grayscale invert"
                            sizes="36px"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                          {award.title}
                        </h3>
                        <p className="mt-[0.2rem] font-mono text-[0.75rem] text-text-2">
                          {award.organization}
                        </p>
                      </div>
                    </div>
                    <span className="whitespace-nowrap pt-[0.2rem] font-mono text-[0.7rem] tracking-[0.05em] text-text-3">
                      {award.year}
                    </span>
                  </div>

                  <p className="max-h-0 overflow-hidden whitespace-pre-line text-[0.9rem] leading-[1.7] text-text-2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
                    {award.description}
                  </p>
                </div>
              </article>
            </SectionRevealer>
          ))}
        </div>
      </div>
    </section>
  )
}
