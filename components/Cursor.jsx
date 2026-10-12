import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px'
        cursorRef.current.style.top = my + 'px'
      }
    }

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      rafId = requestAnimationFrame(animate)
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }
    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor ${isHovering ? 'cursor--hover' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'cursor-ring--hover' : ''}`}
      />
    </>
  )
}
