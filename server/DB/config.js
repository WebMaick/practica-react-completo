const mongoose = require('mongoose')

const connecionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('DB Online')
  } catch (error) {
    console.log('Error al conectar la BD: ' + error)
  }
}

module.exports = {
  connecionDB,
}
