require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
const { createSchema } = require('./db/schema')

const start = async () => {
  await createSchema()
  await fastify.register(cors, { origin: '*' })
  await fastify.register(require('./routes/pollRoutes'))
  await fastify.register(require('./routes/voteRoutes'))
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
}

start()
