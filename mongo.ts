/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (MONGODB_URI == null) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached: { conn: any, promise: any } = (global as any).mongoose

if (!(cached)) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect (): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0
    }

    if (typeof MONGODB_URI !== 'string') {
      throw new Error('MONGODB_URI must be defined as a string')
    }

    cached.promise = mongoose.connect(MONGODB_URI, options).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
