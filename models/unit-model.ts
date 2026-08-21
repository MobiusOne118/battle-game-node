import mongoose from 'mongoose'

const unitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  weight: { type: Number, default: 10 },
  speed: { type: Number, default: 0 }
})

const Unit = mongoose.model('Unit', unitSchema)

export { Unit }