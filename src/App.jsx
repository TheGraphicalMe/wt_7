import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Resources from '@/components/sections/Resources'
import Programs from '@/components/sections/Programs'
import FAQ from '@/components/sections/FAQ'
import About from '@/components/sections/About'
import Blog from '@/components/sections/Blog'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-[#f0ede6]">
      <Navbar />
      <main>
        <Hero />
        <Resources />
        <Programs />
        <FAQ />
        <About />
        <Blog />
      </main>
      <Footer />
    </div>
  )
}
