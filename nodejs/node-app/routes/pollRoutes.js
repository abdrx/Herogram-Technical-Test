const {
  createPoll,
  setStatus,
  deletePoll,
  getActivePolls,
  getPoll
} = require('../Service/pollManagement')

module.exports = async fastify => {
  fastify.post('/poll', async (req, reply) => {
    const { title, questions } = req.body
    const pollId = await createPoll(title, questions)
    reply.code(201).send({ pollId })
  })

  fastify.patch('/poll/:id/activate', async (req, reply) => {
    await setStatus(req.params.id, 'active')
    reply.send({ status: 'active' })
  })

  fastify.patch('/poll/:id/deactivate', async (req, reply) => {
    await setStatus(req.params.id, 'closed')
    reply.send({ status: 'closed' })
  })

  fastify.delete('/poll/:id', async (req, reply) => {
    await deletePoll(req.params.id)
    reply.code(204).send()
  })

  fastify.get('/poll/active', async (_, reply) => {
    const polls = await getActivePolls()
    reply.send(polls)
  })

  fastify.get('/poll/:id', async (req, reply) => {
    const poll = await getPoll(req.params.id)
    if (!poll) return reply.code(404).send({})
    reply.send(poll)
  })
}
