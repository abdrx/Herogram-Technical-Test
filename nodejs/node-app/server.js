const fastify = require('fastify')({ logger: true })
require('dotenv').config()
const authRoutes = require('./routes/auth.js')
const pollRoutes = require('./routes/poll.js')

fastify.register(require('fastify-jwt'), {
  secret: process.env.JWT_SECRET
})

fastify.decorate("authenticate", async function(request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

fastify.register(authRoutes)
fastify.register(pollRoutes)

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
})