const {
  createPoll,
  setStatus,
  deletePoll,
  getActivePolls,
  getPoll
} = require('../Service/pollManagement')

const clients = []

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

  fastify.get('/poll/:id/stream', async (req, reply) => {
  const pollId = req.params.id

  reply.raw.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  })

  const client = reply.raw
  clients.push({ client, pollId })

  const sendUpdate = async () => {
    const poll = await getPoll(pollId)
    const voteData = []

    for (const question of poll.questions) {
      for (const option of question.options) {
        voteData.push({ id: option.id, votes: option.votes || 0 })
      }
    }

    client.write(`data: ${JSON.stringify(voteData)}\n\n`)
  }

  const interval = setInterval(sendUpdate, 3000)

  req.raw.on('close', () => {
    clearInterval(interval)
    const index = clients.findIndex(c => c.client === client && c.pollId === pollId)
    if (index !== -1) clients.splice(index, 1)
    client.end()
  })
})

}


