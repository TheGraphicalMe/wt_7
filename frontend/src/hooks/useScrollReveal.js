import { useEffect, useRef } from 'react'

/**
 * useScrollReveal
 * @param {'reveal' | 'reveal-left' | 'reveal-right' | 'reveal-up'} className
 * @param {boolean} exitOnLeave — animate out when element leaves viewport
 */
export default function useScrollReveal(
  className = 'reveal',
  exitOnLeave = true,
) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Add the base animation class
    el.classList.add(className)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('exit')
          el.classList.add('visible')
        } else if (exitOnLeave && el.classList.contains('visible')) {
          el.classList.remove('visible')
          el.classList.add('exit')
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [className, exitOnLeave])

  return ref
}