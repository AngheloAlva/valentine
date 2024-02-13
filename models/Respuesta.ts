import mongoose from 'mongoose'

const RespuestaSchema = new mongoose.Schema({
  respuestas: {
    type: [String],
    required: true
  }
})

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export default mongoose.models.Respuesta || mongoose.model('Respuesta', RespuestaSchema)
