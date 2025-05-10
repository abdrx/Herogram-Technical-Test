const pool = require('../db/dbService')
const { submitVote } = require('../Service/voteHandler')

module.exports = async function (fastify) {
  fastify.get('/poll/:id/stream', async (req, reply) => {
    reply.raw.setHeader('Content-Type', 'text/event-stream')
    reply.raw.setHeader('Cache-Control', 'no-cache')
    reply.raw.setHeader('Connection', 'keep-alive')
    reply.raw.setHeader('Access-Control-Allow-Origin', '*') // CORS FIX HERE

    const { id } = req.params

    const sendUpdate = async () => {
      const { rows } = await pool.query(
        `SELECT o.id, COUNT(v.id) AS votes
         FROM options o
         LEFT JOIN votes v ON o.id = v.option_id
         WHERE o.question_id IN (SELECT id FROM questions WHERE poll_id = $1)
         GROUP BY o.id`, [id]
      )
      reply.raw.write(`data: ${JSON.stringify(rows)}\n\n`)
    }

    const interval = setInterval(sendUpdate, 2000)

    req.raw.on('close', () => {
      clearInterval(interval)
      reply.raw.end()
    })
  })
}

module.exports = async function (fastify) {
  fastify.post('/vote', async (req, reply) => {
    const { voter, optionId } = req.body

    if (!voter || !optionId) {
      return reply.code(400).send({ error: 'voter and optionId are required' })
    }

    try {
      await submitVote(voter, optionId)
      reply.code(201).send({ message: 'Vote submitted successfully' })
    } catch (err) {
      req.log.error(err)
      reply.code(500).send({ error: 'Failed to submit vote' })
    }
  })
}


