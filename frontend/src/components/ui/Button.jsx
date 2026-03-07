/**
 * Button component
 * Variants: 'primary' | 'outline' | 'ghost' | 'nav'
 */
export default function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  onClick,
  ...props
}) {
  const base =
    'inline-block font-body font-semibold tracking-wide transition-all duration-200 cursor-pointer text-sm'

  const variants = {
    primary:
      'bg-gold text-bg px-8 py-3.5 rounded shadow-gold hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-gold-lg',
    outline:
      'border border-gold text-gold px-5 py-2 rounded text-xs hover:bg-gold hover:text-bg',
    ghost:
      'border border-white/10 text-muted px-5 py-2 rounded text-xs cursor-default',
    nav: 'bg-gold text-bg px-5 py-2 rounded hover:bg-gold-light hover:-translate-y-px',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
