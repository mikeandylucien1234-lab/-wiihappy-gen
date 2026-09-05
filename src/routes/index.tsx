import { createFileRoute } from '@tanstack/react-router'
import { About } from '@/components/sections/About'
import { Categories } from '@/components/sections/Categories'
import { Consultation } from '@/components/sections/Consultation'
import { ConsultationBanner } from '@/components/sections/ConsultationBanner'
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
      <DirectorQuote />
      <Categories />
      <div className="md:hidden">
        <ConsultationBanner />
      </div>
      <About />
      <GlobalReach />
      <div className="hidden md:block">
        <Consultation />
      </div>
      <Faq />
      <Footer />
    </div>
  )
}
