export interface AboutData {
  name: string
  title: string
  location: string
  available: boolean
  bio: string
  photo: string
  stats: AboutStat[]
  skills: string[]
  socials: {
    github?: string
    linkedin?: string
    email?: string
    twitter?: string
  }
  bodyHtml: string
}

export interface AboutStat {
  value: number
  label: string
  suffix?: string
}
