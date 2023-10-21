import { useSpring, animated } from '@react-spring/web'
import { ElementType, PropsWithChildren, useCallback } from 'react'

type ButtonProps = PropsWithChildren<ElementType<'button'>>

const Button = (props: ButtonProps) => {
  const [springs, api] = useSpring(
    () => ({
      to: {
        rotate: '-22deg',
      },
    }),
    [],
  )

  const handleMouseEnter = useCallback(() => {
    api.start({
      to: {
        rotate: '0deg',
      },
    })
  }, [api])

  const handleMouseLeave = useCallback(() => {
    api.start({
      to: {
        rotate: '-22deg',
      },
    })
  }, [api])

  return (
    <animated.button
      className="relative p-2 bg-gray-800 text-gray-400 before:content-[''] before:border-2 before:border-solid before:border-emerald-400 before:w-full before:h-full before:absolute before:top-1 before:left-[-4px]"
      style={springs}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  )
}

export default Button
