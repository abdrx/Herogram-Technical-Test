const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
const { createSchema } = require('./db/schemaManager')
const pollRoutes = require('./routes/pollRoutes')
const voteRoutes = require('./routes/voteService')

const start = async () => {
  await fastify.register(cors, {
    origin: 'http://localhost:5173'
  })

  await createSchema()

  fastify.register(pollRoutes)
  fastify.register(voteRoutes)

  await fastify.listen({ port: 3000, host: '0.0.0.0' })
}

start()
