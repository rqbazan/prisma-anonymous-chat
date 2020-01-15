import Router from 'next/router'
import getNonSecretId from './get-non-secret-id'

export default function goToChannel(type, name) {
  const id = getNonSecretId()

  Router.push(
    {
      pathname: '/',
      query: {
        userId: id,
        channelType: type,
        channelName: name
      }
    },
    `/u/${id}/${type}/${name}`
  )
}
