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
import { Services } from '@/components/sections/Services'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-surface text-ink">
      <Header overlay />
      <Hero />
      <Services />
      <About />
      <DirectorQuote />
      <GlobalReach />
      <Categories />
      <Consultation />
      <Faq />
      <Footer />
    </div>
  )
}
