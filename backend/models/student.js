// External Dependancies
const mongoose = require('mongoose')

// Connect to DB
mongoose.connect('mongodb://localhost:27017/students')
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))


const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  class: Number,
  subjectMarks: Array,
  isDeleted: Boolean,
  isActivated: Boolean,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)