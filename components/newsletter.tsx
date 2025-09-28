"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button, buttonVariants } from "./ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Cross1Icon } from "@radix-ui/react-icons"
import { ArrowRight } from "lucide-react" // Added ArrowRight import
import { useIsV0 } from "@/lib/context"

const DURATION = 0.3
const DELAY = DURATION
const EASE_OUT = "easeOut"
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const
const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8,
}

export const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(false)

  const isInitialRender = useRef(true)

  useEffect(() => {
    return () => {
      isInitialRender.current = false
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="flex overflow-hidden relative flex-col gap-4 justify-center items-center pt-10 w-full h-full short:lg:pt-10 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides short:lg:gap-4 lg:gap-8">
      <motion.div layout="position" transition={{ duration: DURATION, ease: EASE_OUT }}>
        <h1 className="font-serif text-5xl italic short:lg:text-8xl sm:text-8xl lg:text-9xl text-foreground">
          C4H 2026
        </h1>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink">
        <AnimatePresenceGuard>
          {!isOpen && (
            <motion.div
              key="newsletter"
              initial={isInitialRender.current ? false : "hidden"}
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  y: -150,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full max-w-xl md:gap-6 lg:gap-8">
                <motion.a
                  href="https://forms.gle/z8M33qTyErHDxP6YA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full rounded-full transition-[background-color,box-shadow] backdrop-blur-sm duration-200 ease-out bg-primary/20 shadow-sm ring-1 ring-transparent hover:bg-primary/30 hover:ring-1 hover:ring-primary/40 hover:ring-offset-4 hover:ring-offset-black/10 focus-visible:bg-primary/20 focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black/10 disabled:cursor-not-allowed disabled:opacity-50 md:text-base text-white border-2 border-white/50 h-11 !text-base px-4 items-center justify-center font-medium gap-2" // Added gap-2 for spacing between text and arrow
                  initial={isInitialRender.current ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: DURATION,
                      ease: EASE_OUT_OPACITY,
                    },
                  }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                >
                  Apply now
                  <ArrowRight className="w-4 h-4" /> {/* Added arrow icon */}
                </motion.a>

                <motion.p
                  initial={isInitialRender.current ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                  }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                  className="text-base short:lg:text-lg sm:text-lg lg:text-xl !leading-[1.1] font-medium text-center text-foreground text-pretty"
                >
                  We’re bringing together 150 of the most cracked high school students to build projects in
                  sustainability, health, education, and finance. In one day, you’ll team up, code, and create solutions
                  that make a real impact. Hosted in the heart of New York City, you’ll build alongside other driven students, meet industry leaders and mentors, and compete for prizes as well as funding for your project.
                </motion.p>
              </div>
            </motion.div>
          )}

          <motion.div layout="position" transition={SPRING} key="button" className={isOpen ? "my-6" : "mt-6"}>
            <Button className={cn("relative px-8")} onClick={() => setIsOpen(!isOpen)} shine={!isOpen}>
              <motion.span
                animate={{ x: isOpen ? -16 : 0 }}
                transition={{ duration: DURATION, ease: EASE_OUT }}
                className="inline-block"
              >
                Manifesto
              </motion.span>

              {isOpen && (
                <motion.div
                  className={cn(
                    buttonVariants({ variant: "iconButton", size: "icon" }),
                    "absolute -top-px -right-px aspect-square",
                  )}
                  initial={{ opacity: 0, scale: 0.8, rotate: -40 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: DURATION,
                    ease: EASE_OUT,
                    delay: DELAY,
                  }}
                >
                  <Cross1Icon className="size-5 text-primary-foreground" />
                </motion.div>
              )}
            </Button>
          </motion.div>

          {isOpen && (
            <motion.div
              key="manifesto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                },
              }}
              className="relative flex min-h-0 flex-shrink overflow-hidden text-sm md:text-base max-h-[calc(70dvh-var(--footer-safe-area))] flex-col gap-8 text-center backdrop-blur-xl text-balance border-2 border-border/50 bg-primary/20 max-w-3xl text-foreground rounded-3xl ring-1 ring-offset-primary/10 ring-border/10 ring-offset-2 shadow-button"
            >
              <article className="relative overflow-y-auto italic p-6 h-full [&_p]:my-4">
                <p>We don't wait for change. We create it.</p>
                <p>
                  At Code4Hope, we unite technology and creativity to drive social change. Our mission is to foster a
                  global community of young innovators addressing real-world challenges. We believe in the power of
                  youth to shape the future, and we provide the platform, mentorship, and resources to make that happen.
                </p>
                <p>
                  This isn't about coding. It's about using technology to solve pressing issues in sustainability,
                  health, education, and finance. It's about empowering the next generation to think critically, act
                  boldly, and make a tangible impact.
                </p>
                <p>We're building a movement. A movement where ideas become solutions, and solutions become change.</p>
                <p>Apply to Code4Hope 2026 now.</p>
              </article>
            </motion.div>
          )}
        </AnimatePresenceGuard>
      </div>
    </div>
  )
}

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  const isV0 = useIsV0()

  return isV0 ? (
    <>{children}</>
  ) : (
    <AnimatePresence mode="popLayout" propagate>
      {children}
    </AnimatePresence>
  )
}
