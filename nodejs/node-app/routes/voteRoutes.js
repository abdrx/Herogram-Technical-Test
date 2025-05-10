const { v4: uuidv4 } = require('uuid')
const pool = require('../db/dbService')

async function submitVote (optionId, voter) {
  const id = uuidv4()
  await pool.query(
    'insert into votes(id,option_id,voter) values($1,$2,$3)',
    [id, optionId, voter])
  return id
}

module.exports = { submitVote }
