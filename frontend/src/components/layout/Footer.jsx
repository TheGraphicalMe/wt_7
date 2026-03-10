const FOOTER_LINKS = {
  Programs: [
    { label: 'Live Class March 2026', href: '#programs' },
    { label: 'EMA Strategy Masterclass', href: '#programs' },
    { label: 'Advanced Strategy', href: '#programs' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Terms & Conditions' },
    { label: 'Risk Disclaimer' },
  ],
}

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/wizard_trader7/?hl=en',
    hoverClass: 'hover:border-pink-500/40 hover:bg-pink-500/10',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497"/>
            <stop offset="5%" stopColor="#fdf497"/>
            <stop offset="45%" stopColor="#fd5949"/>
            <stop offset="60%" stopColor="#d6249f"/>
            <stop offset="90%" stopColor="#285AEB"/>
          </radialGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)"/>
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.8"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@OfficialWizardTrader7',
    hoverClass: 'hover:border-red-500/40 hover:bg-red-500/10',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
        <rect x="1" y="5" width="22" height="14" rx="4" fill="#FF0000"/>
        <polygon points="9.5,8.5 9.5,15.5 16,12" fill="white"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
   <footer className="bg-bg/90 backdrop-blur-sm border-t border-white/[0.08] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08] mb-8">
          {/* Brand */}
          <div>
            <span className="font-display text-lg font-bold text-gold-light tracking-wide">
              Wizard Trader 7
            </span>
            <p className="mt-3 text-muted text-sm leading-relaxed max-w-[220px]">
              Trading made simple for everyone. A clean, repeatable approach
              that actually works — regardless of your experience level.
            </p>

          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h5 className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-muted mb-4">
                {heading}
              </h5>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.85rem] text-[#f0ede6]/70 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
  <p className="text-muted text-xs">© 2025 Wizard Trader 7, LLC. All rights reserved.</p>

  {/* Socials */}
  <div className="flex items-center gap-3">
    {SOCIAL_LINKS.map((social) => (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className={`w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-muted ${social.hoverClass} transition-all duration-200`}
    >
      {social.icon}
    </a>
    ))}
  </div>

  <a
    href="mailto:support@.com"
    className="text-muted text-xs hover:text-gold transition-colors"
  >
    support@wizardtrader7.com
  </a>
</div>
      </div>
    </footer>
  )
}
