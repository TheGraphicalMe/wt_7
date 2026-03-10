import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import useScrollReveal from '@/hooks/useScrollReveal'
import blogData from '@/data/blogData'



export default function Blog() {
  const headerRef = useScrollReveal('reveal-left')

  return (
    <section id="blog" className="py-28 px-6 section-tint border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="reveal flex justify-between items-end mb-12 flex-wrap gap-4"
        >
          <div>
            <SectionLabel>Free Content</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#f0ede6]">
              Stay Connected
            </h2>
          </div>
          <Button variant="outline" href="#">
            View all posts
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.map((post, i) => (
            <BlogCard key={post.id} post={post} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogCard({ post, delay , index }) {
  const ref = useScrollReveal(index % 2 === 0 ? 'reveal-left' : 'reveal-right')

  // If post has a YouTube URL, open YouTube. Otherwise use internal slug.
  const href = post.youtubeUrl ? post.youtubeUrl : `#blog/${post.slug}`
  const isExternal = !!post.youtubeUrl

  return (
    <a
      ref={ref}
      href={href}
      target={isExternal ? '_blank' : '_self'}       // opens YouTube in new tab
      rel={isExternal ? 'noopener noreferrer' : ''}  // security best practice
      className="reveal block bg-[rgba(22,22,20,0.85)] border border-white/[0.08] rounded-xl overflow-hidden hover:-translate-y-1 hover:border-gold/20 transition-all duration-300 group"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* YouTube play button overlay */}
      <div className="overflow-hidden aspect-video relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover brightness-[0.8] saturate-[0.8] group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"
        />
        {/* Show play button only if it's a YouTube post */}
        {isExternal && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-gold">
            {post.tag}
          </div>
          {/* YouTube badge */}
          {isExternal && (
            <span className="font-mono text-[0.6rem] tracking-wide uppercase text-red-400 border border-red-400/30 rounded px-1.5 py-0.5">
              YouTube
            </span>
          )}
        </div>
        <div className="text-xs text-muted mb-2">{post.date}</div>
        <h3 className="font-display text-base font-semibold text-[#f0ede6] leading-snug group-hover:text-gold-light transition-colors duration-200">
          {post.title}
        </h3>
      </div>
    </a>
  )
}