import Image from 'next/image'
import Link from 'next/link'

/* eslint-disable react/react-in-jsx-scope */
function SigaPage (): React.ReactElement {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-8'>
      <Image
        src="/images/page2.jpg"
        alt="Gato Blanco"
        width={500}
        height={500}
        className='rounded-lg'
      />

      <Link href='/siga/preguntas' className='btn'>
        Siga mamacita
      </Link>
    </div>
  )
}

export default SigaPage
