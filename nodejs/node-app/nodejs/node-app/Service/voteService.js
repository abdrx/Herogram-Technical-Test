const { v4: uuidv4 } = require('uuid')
const pool = require('../db/dbService')

async function submitVote(voter, optionId) {
  await pool.query(
    'insert into votes(id,option_id,voter) values($1,$2,$3)',
    [uuidv4(), optionId, voter]
  )
}

module.exports = { submitVote }
