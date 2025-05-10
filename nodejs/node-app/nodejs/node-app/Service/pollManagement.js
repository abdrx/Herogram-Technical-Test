const { v4: uuidv4 } = require('uuid')
const pool = require('../db/dbService')

async function createPoll (title, questions) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const pollId = uuidv4()
    await client.query('insert into polls(id,title,status) values ($1,$2,$3)', [pollId, title, 'active'])
    for (let i = 0; i < questions.length; i++) {
      const qid = uuidv4()
      await client.query('insert into questions(id,poll_id,text,"order") values ($1,$2,$3,$4)', [qid, pollId, questions[i].text, i + 1])
      for (const opt of questions[i].options) {
        await client.query('insert into options(id,question_id,text) values ($1,$2,$3)', [uuidv4(), qid, opt])
      }
    }
    await client.query('COMMIT')
    return pollId
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

async function setStatus (pollId, status) {
  await pool.query('update polls set status=$1 where id=$2', [status, pollId])
}

async function deletePoll (pollId) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('delete from options where question_id in (select id from questions where poll_id=$1)', [pollId])
    await client.query('delete from questions where poll_id=$1', [pollId])
    await client.query('delete from polls where id=$1', [pollId])
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

async function getActivePolls () {
  const { rows } = await pool.query('select id,title from polls where status=$1 order by created_at desc', ['active'])
  return rows
}

async function getPoll (id) {
  const { rows } = await pool.query(
    `select p.id poll_id,
            p.title,
            p.status,
            q.id   qid,
            q.text qtext,
            o.id   oid,
            o.text otext,
            coalesce(v.votes,0)::int votes
       from polls p
       join questions q on q.poll_id = p.id
       join options   o on o.question_id = q.id
       left join (
         select option_id, count(*) votes
         from votes
         group by option_id
       ) v on v.option_id = o.id
      where p.id = $1
      order by q."order", o.text`,
    [id]
  )
  if (!rows.length) return null
  const poll = { id, title: rows[0].title, status: rows[0].status, questions: [] }
  const map = new Map()
  for (const r of rows) {
    if (!map.has(r.qid)) {
      map.set(r.qid, { id: r.qid, text: r.qtext, options: [] })
      poll.questions.push(map.get(r.qid))
    }
    map.get(r.qid).options.push({ id: r.oid, text: r.otext, votes: r.votes })
  }
  return poll
}


// module.exports = { /* other exports */, getPoll }
module.exports = { createPoll, setStatus, deletePoll, getActivePolls, getPoll }
