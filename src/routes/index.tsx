import { createFileRoute } from '@tanstack/react-router'
import { About } from '@/components/sections/About'
import { Categories } from '@/components/sections/Categories'
import { Consultation } from '@/components/sections/Consultation'
import { DirectorQuote } from '@/components/sections/DirectorQuote'
import { Faq } from '@/components/sections/Faq'
import { Footer } from '@/components/sections/Footer'
import { GlobalReach } from '@/components/sections/GlobalReach'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { QuoteDrawer } from '@/components/sections/QuoteDrawer'
import { QuoteFab } from '@/components/sections/QuoteFab'
import { Services } from '@/components/sections/Services'
import { QuoteDrawerProvider } from '@/features/quote-drawer/QuoteDrawerContext'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <QuoteDrawerProvider>
      <div className="overflow-x-hidden bg-surface text-ink">
        <Header />
        <Hero />
        <About />
        <Services />
        <DirectorQuote />
        <GlobalReach />
        <Categories />
        <Consultation />
        <Faq />
        <Footer />
        <QuoteDrawer />
        <QuoteFab />
      </div>
    </QuoteDrawerProvider>
  )
}
