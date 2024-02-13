import Respuesta from '../../../models/Respuesta'
import { type NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export async function POST (req: NextRequest, res: NextResponse): Promise<NextResponse | void> {
  try {
    if (typeof process.env.MONGODB_URI !== 'string') {
      throw new Error('MONGODB_URI environment variable is not defined or is not a string')
    }

    void mongoose.connect(process.env.MONGODB_URI)

    const data = req.body
    let respuestas: any = {}

    if (data instanceof ReadableStream) {
      const rawData = await new Response(data).text()
      respuestas = JSON.parse(rawData)
    } else {
      respuestas = data
    }

    console.log(respuestas)
    await Respuesta.create({ respuestas })

    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error)
  }
}
