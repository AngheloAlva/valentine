/* eslint-disable react/react-in-jsx-scope */
'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const preguntas1 = {
  pregunta: '¿Qué deseas hacer?',
  respuestas: ['Ir al Cine', 'Ir a Pasear', 'Comprar ropa', 'Quedarse en casa']
}

const preguntas2 = {
  pregunta: '¿Qué quieres comer?',
  respuestas: ['Hamburguesa', 'Pizza', 'Restaurante', 'En casa']
}

function PreguntasPage (): React.ReactElement {
  const [pregunta, setPregunta] = useState<typeof preguntas1 | typeof preguntas2>(preguntas1)
  const [imagen, setImagen] = useState<string>('/images/page2-1.jpg')
  const [respuestas, setRespuestas] = useState<string[]>([])

  const router = useRouter()

  const sendResponse = async (respuestas: string[]): Promise<void> => {
    await fetch('/api/respuestas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(respuestas)
    })
  }

  const handleRespuesta = (respuesta: string): void => {
    const nuevasRespuestas = [...respuestas, respuesta]
    setRespuestas(nuevasRespuestas)

    if (respuestas.length === 0) {
      setPregunta(preguntas2)
      setImagen('/images/page3.jpg')
    }

    if (respuestas.length === 1) {
      void sendResponse(nuevasRespuestas)
      router.push('/final')
    }
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-8 px-5'>
      <Image
        src={imagen}
        alt='Gato Blanco'
        width={500}
        height={500}
        className='rounded-lg'
      />

      <h1 className='font-extrabold text-4xl text-center'>
        <span className='bg-gradient-to-r from-purple-500 to-pink-400 text-transparent bg-clip-text'>
          {pregunta.pregunta}
        </span>
      </h1>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7'>
        {pregunta.respuestas.map((respuesta, index) => (
          <button
            key={index}
            className='btn'
            onClick={() => { handleRespuesta(respuesta) }}
          >
            {respuesta}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PreguntasPage
