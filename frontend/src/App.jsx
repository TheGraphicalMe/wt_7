import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Resources from '@/components/sections/Resources'
import Programs from '@/components/sections/Programs'
import FAQ from '@/components/sections/FAQ'
import About from '@/components/sections/About'
import Blog from '@/components/sections/Blog'
import Platforms from '@/components/sections/Platforms'
import AnimatedBackground from '@/components/ui/AnimatedBackground'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-[#f0ede6]">

      {/* Constant animated background — sits behind everything */}
      <AnimatedBackground />

      {/* All content above the background */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Resources />
          <Programs />
          <Platforms />
          <FAQ />
          <About />
          <Blog />
        </main>
        <Footer />
      </div>

    </div>
  )
}