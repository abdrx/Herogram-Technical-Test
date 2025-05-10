const pool = require('./dbService')

async function tableExists(name) {
  const { rows } = await pool.query(
    `select exists(
       select from information_schema.tables
       where table_schema = 'public' and table_name = $1
     )`, [name])
  return rows[0].exists
}

async function createIfMissing(name, ddl) {
  if (!(await tableExists(name))) await pool.query(ddl)
}

async function createSchema() {
  await createIfMissing('polls', `
    create table polls(
      id uuid primary key,
      title text not null,
      status text check(status in ('active','closed')) default 'active',
      created_at timestamp default now()
    );
  `)

  await createIfMissing('questions', `
    create table questions(
      id uuid primary key,
      poll_id uuid references polls(id) on delete cascade,
      text text not null,
      position int not null
    );
  `)

  await createIfMissing('options', `
    create table options(
      id uuid primary key,
      question_id uuid references questions(id) on delete cascade,
      text text not null
    );
  `)

  await createIfMissing('votes', `
    create table votes(
      id uuid primary key,
      option_id uuid references options(id) on delete cascade,
      voter varchar(64),
      created_at timestamp default now()
    );
  `)
}

module.exports = { createSchema }
