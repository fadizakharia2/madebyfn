export type Page =
  | 'home'
  | 'work'
  | 'case-study'
  | 'services'
  | 'studio'
  | 'insights'
  | 'article'
  | 'start'
  | '404'

export type NavFn = (page: Page) => void
