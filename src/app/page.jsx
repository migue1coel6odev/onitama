'use client'

import Button from '@/components/button/Button'
import React, { useCallback } from 'react'
import { useSprings, animated } from '@react-spring/web'

const plusOrMinus = () => (Math.random() < 0.5 ? -1 : 1)

export default function Home() {
  const [springs, api] = useSprings(
    7,
    () => ({
      //   to: { x: 0, y: 0 },
      to: {
        x: Math.random() * 200 * plusOrMinus(),
        y: Math.random() * 200 * plusOrMinus(),
        fontSize: Math.random() * 400 + 80,
        color: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
      },
      config: {
        duration: 2000,
      },
    }),
    [],
  )

  const handleMouseEnter = useCallback(() => {
    console.log('updated')
    api.start(() => {
      return {
        to: {
          x: Math.random() * 200 * plusOrMinus(),
          y: Math.random() * 200 * plusOrMinus(),
          fontSize: Math.random() * 400 + 60,
          color: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
        },
      }
    })
  }, [api])

  const handleReset = useCallback(() => {
    api.start({
      x: 0,
      y: 0,
    })
  }, [api])

  return (
    <main className="m-auto ">
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <div
          className="inline-flex items-center justify-center font-display text-9xl uppercase h-[400px] w-[600px]"
          onMouseEnter={handleMouseEnter}
        >
          {'ONITAMA'.split('').map((char, index) => (
            <animated.h1 key={`${char}-${index}`} style={springs[index]}>
              {char}
            </animated.h1>
          ))}
        </div>
        <Button>New Game</Button>
        <Button onClick={handleReset}>Fix UI</Button>
        <Button>How-to play</Button>
      </div>
    </main>
  )
}
