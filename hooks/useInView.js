import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(el)
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}
