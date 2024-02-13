/* eslint-disable react/react-in-jsx-scope */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home (): React.ReactElement {
  const [buttonStyle, setButtonStyle] = useState({})

  const moveButton = (): void => {
    const newX = Math.random() * (window.innerWidth - 100)
    const newY = Math.random() * (window.innerHeight - 50)
    setButtonStyle({
      position: 'absolute',
      left: `${newX}px`,
      top: `${newY}px`
    })
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-8'>
      <Image
        src="/images/home.jpg"
        alt="Gato Blanco"
        width={500}
        height={500}
        className='rounded-lg'
      />

      <h1 className='font-extrabold text-3xl'>
        <span className='bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'>
          ¿Quieres ser mi valentine?
        </span>
      </h1>

      <div className='flex gap-4'>
        <Link href="/siga">
          <button className='btn'>
            Si
          </button>
        </Link>
        <button
          disabled
          className='font-bold border px-8 py-4 rounded-lg bg-red-500'
          style={buttonStyle}
          onMouseOver={moveButton}
        >
          No
        </button>
      </div>
    </div>
  )
}
