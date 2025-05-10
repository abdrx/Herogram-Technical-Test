const { v4: uuidv4 } = require('uuid')

module.exports = async function (fastify) {

  fastify.post('/auth/anon', async (req, reply) => {
    const userId = uuidv4()
    const token = fastify.jwt.sign(
      { userId, anonymous: true },
      { expiresIn: '15m' }
    )
    return { token, userId }
  })

  fastify.post('/auth/named', async (req, reply) => {
    const { userId, name } = req.body
    if (!userId || !name) return reply.status(400).send({ error: 'userId and name required' })

    const token = fastify.jwt.sign(
      { userId, name, anonymous: false },
      { expiresIn: '1h' } 
    )
    return { token, userId, name }
  })
}
