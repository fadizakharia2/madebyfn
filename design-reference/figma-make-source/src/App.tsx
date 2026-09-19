import { useState } from 'react'
import { Page, NavFn } from './types'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Services from './pages/Services'
import Studio from './pages/Studio'
import Insights from './pages/Insights'
import Article from './pages/Article'
import StartProject from './pages/StartProject'
import NotFound from './pages/NotFound'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate: NavFn = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home navigate={navigate} />
      case 'work': return <Work navigate={navigate} />
      case 'case-study': return <CaseStudy navigate={navigate} />
      case 'services': return <Services navigate={navigate} />
      case 'studio': return <Studio navigate={navigate} />
      case 'insights': return <Insights navigate={navigate} />
      case 'article': return <Article navigate={navigate} />
      case 'start': return <StartProject navigate={navigate} />
      default: return <NotFound navigate={navigate} />
    }
  }

  return (
    <div style={{ background: '#0A0A0B', color: '#F0EDE8', minHeight: '100%' }}>
      <CustomCursor />
      <Nav page={page} navigate={navigate} />
      <main>{renderPage()}</main>
      {page !== 'start' && <Footer navigate={navigate} />}
    </div>
  )
}
