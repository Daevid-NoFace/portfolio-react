import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Runs setup(el) inside a gsap.matchMedia scope, only when motion is allowed; reverted on unmount.
export const useGsap = (setup) => {
  const ref = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia(ref.current)
    mm.add('(prefers-reduced-motion: no-preference)', () => setup(ref.current))
    return () => mm.revert()
  }, [])
  return ref
}
