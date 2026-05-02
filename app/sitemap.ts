import type { MetadataRoute } from 'next'
import { PORTOFOLIO } from '@/lib/constant'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-02')

  return [
    {
      url: PORTOFOLIO.SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
