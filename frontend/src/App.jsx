import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Resources from '@/components/sections/Resources'
import Programs from '@/components/sections/Programs'
import FAQ from '@/components/sections/FAQ'
import About from '@/components/sections/About'
import Blog from '@/components/sections/Blog'
import Platforms from './components/sections/Platforms'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-[#f0ede6]">
      <Navbar />
      <main>
        <Hero />
        <Resources />
        <Programs />
        <Platforms />
        <About />
        <Blog />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
