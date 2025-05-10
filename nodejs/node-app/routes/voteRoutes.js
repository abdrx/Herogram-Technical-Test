const { submitVote } = require('../Service/voteService')

module.exports = async fastify => {
  fastify.post('/vote', async (req, reply) => {
    const { voter, optionId } = req.body
    await submitVote(voter, optionId)
    reply.code(201).send({})
  })
}
