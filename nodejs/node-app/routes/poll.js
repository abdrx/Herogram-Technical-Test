module.exports = async function (fastify) {
  fastify.post('/poll/:id/vote', { preHandler: [fastify.authenticate] }, async (req, reply) => {
    const { id } = req.params
    const { option } = req.body
    const user = req.user 

    return { message: 'Vote recorded' }
  })
}
