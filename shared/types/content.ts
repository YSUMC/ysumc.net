export type ReportMeta = {
  order: number
  tag: string
  summary: string
  image: string
  displayDate: string
}

export type ReportItem = ReportMeta & {
  title: string
  path: string
}

export type ProjectCardData = {
  title: string
  path: string
  category: 'work' | 'activity' | 'workflow' | 'mcserver' | 'other'
  order: number
  subtitle?: string
  status?: 'completed' | 'ongoing' | 'closed'
  period?: string
  cardImage?: string
  dark?: boolean
}
