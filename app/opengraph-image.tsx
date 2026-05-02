import { ImageResponse } from 'next/og'
import { PORTOFOLIO } from '@/lib/constant'

export const alt = `${PORTOFOLIO.NAME} portfolio preview`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#050505',
        color: '#ffffff',
        padding: '72px',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#9ca3af',
          fontSize: 28,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        <span>Portfolio</span>
        <span>{PORTOFOLIO.LOCATION}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -3,
          }}
        >
          {PORTOFOLIO.NAME}
        </div>
        <div style={{ color: '#d4d4d8', fontSize: 40 }}>
          {PORTOFOLIO.ROLE} - React, Next.js, TypeScript
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#9ca3af',
          fontSize: 26,
        }}
      >
        <span>{PORTOFOLIO.EMAIL}</span>
        <span>{PORTOFOLIO.SITE_URL.replace(/^https?:\/\//, '')}</span>
      </div>
    </div>,
    size
  )
}
