import { useEffect, useRef } from 'react'

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, adds the 'visible' class
 * (defined in index.css alongside the 'reveal' class).
 *
 * @param {object} options - IntersectionObserver options
 * @returns {React.RefObject}
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, ...options },
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return ref
}
