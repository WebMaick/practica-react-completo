import mongoose from 'mongoose'

export const conectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('BD Online')
  } catch (error) {
    console.log('Error al conectar a la BD' + error)
  }
}
