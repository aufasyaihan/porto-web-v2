import type { MetadataRoute } from 'next'
import { PORTOFOLIO } from '@/lib/constant'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${PORTOFOLIO.SITE_URL}/sitemap.xml`,
    host: PORTOFOLIO.SITE_URL,
  }
}
