'use strict'
// Require external modules
const Student = require('../../../models/student')
const boom = require('boom')


module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      let obj ={};
      if(request.query.filterName && request.query.searchText){
        obj[request.query.filterName] = { $regex: request.query.searchText, '$options': 'i' } 
      }
      console.log(obj)
      const students = await Student.find(obj)
      reply.status(200).send(students)
    } catch (err) {
      throw boom.boomify(err)
    }
  })

  // Get single student by ID
  fastify.get('/:id', async function (request, reply) {
    try {
      const id = request.params.id
      const student = await Student.findById(id)
      reply.status(200).send(student)
    } catch (err) {
      throw boom.boomify(err)
    }
  })

  // Add a new student
  fastify.post('/' ,async function (request, reply) {
    try {
      const student = new Student(request.body)
      let _data = student.save()
      reply.status(200).send(_data)
    } catch (err) {
      throw boom.boomify(err)
    }
  })

  // Update an existing student
  fastify.put('/:id', async function (request, reply) {
    try {
      const id = request.params.id
      const student = request.body
      const { ...updateData } = student
      const update = await Student.findByIdAndUpdate(id, updateData, { new: true })
      reply.status(200).send(update)
    } catch (err) {
      throw boom.boomify(err)
    }
  })

  // Delete a student
  fastify.delete('/:id', async function (request, reply) {
    try {
      const id = request.params.id
      const student = await Student.findByIdAndRemove(id)
      reply.status(200).send(student)
    } catch (err) {
      throw boom.boomify(err)
    }
  })
}
