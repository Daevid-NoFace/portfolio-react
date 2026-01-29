import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (animationConfig) => {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (animationConfig.targets) {
        gsap.fromTo(
          animationConfig.targets,
          animationConfig.from,
          {
            ...animationConfig.to,
            scrollTrigger: {
              trigger: ref.current,
              start: animationConfig.start || "top 80%",
              ...animationConfig.scrollTrigger
            }
          }
        )
      }
    }, ref)

    return () => ctx.revert()
  }, [])

  return ref
}

export const useInitialAnimation = (animationConfig) => {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (animationConfig.targets) {
        gsap.fromTo(
          animationConfig.targets,
          animationConfig.from,
          animationConfig.to
        )
      } else {
        gsap.fromTo(
          ref.current,
          animationConfig.from,
          animationConfig.to
        )
      }
    }, ref)

    return () => ctx.revert()
  }, [])

  return ref
}
