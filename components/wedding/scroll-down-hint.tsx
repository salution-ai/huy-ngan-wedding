"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ScrollDownHint() {
  return (
    <motion.div
      animate={{ y: 10 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Image
        src="/gifs/scroll-down.gif"
        alt="Mouse Scroll"
        width={70}
        height={70}
        className="h-full w-full object-cover"
      />
    </motion.div>
  )
}
