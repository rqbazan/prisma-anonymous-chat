import createknex from 'knex'
import runScript from './run-script'
import getStringConnection from './get-string-connection'

async function script() {
  const knex = createknex({
    client: 'pg',
    connection: getStringConnection(),
    searchPath: 'default$default'
  })

  const query = `
    select chat as id, C.type as type, max("createdAt") as "lastSentMessageAt"
    from "Message" as M
    inner join "Chat" C on M.chat = C.id
    group by chat, C.type
    order by C.type;
`

  const { rows: chats } = await knex.raw(query)

  const promises = chats.map(chat =>
    knex(chat.type === 'PRIVATE' ? 'PrivateChat' : 'GroupChat')
      .where('id', '=', chat.id)
      .update({ lastSentMessageAt: chat.lastSentMessageAt })
  )

  await Promise.all(promises)
}

runScript(script)
