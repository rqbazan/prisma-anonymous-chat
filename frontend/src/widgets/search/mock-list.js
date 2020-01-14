import React from 'react'
import Router, { useRouter } from 'next/router'
import ChatPreview from '~/components/chat-preview'

const channels = [
  {
    channelName: 'gzi12n',
    channelType: 'g'
  },
  {
    channelName: 'tdtwaq',
    channelType: 'p'
  },
  {
    channelName: '88d3j6',
    channelType: 'p'
  },
  {
    channelName: 'rzoxh3',
    channelType: 'p'
  },
  {
    channelName: '9fbqyt',
    channelType: 'p'
  },
  {
    channelName: 'ya7wlp',
    channelType: 'g'
  },
  {
    channelName: 'j23ih7',
    channelType: 'p'
  },
  {
    channelName: 'en1z3t',
    channelType: 'g'
  },
  {
    channelName: 'd7co9o',
    channelType: 'g'
  },
  {
    channelName: 'wgrlv',
    channelType: 'g'
  },
  {
    channelName: '7b7tmh',
    channelType: 'p'
  },
  {
    channelName: '09qzy',
    channelType: 'g'
  },
  {
    channelName: 'kcgg7',
    channelType: 'g'
  },
  {
    channelName: '5mfn5e',
    channelType: 'g'
  },
  {
    channelName: 'jcou0i',
    channelType: 'g'
  },
  {
    channelName: '7h6v0c',
    channelType: 'g'
  },
  {
    channelName: 'mxim2',
    channelType: 'g'
  },
  {
    channelName: 'jfaw5e',
    channelType: 'p'
  },
  {
    channelName: '0j0lx',
    channelType: 'p'
  },
  {
    channelName: '2699wk',
    channelType: 'p'
  },
  {
    channelName: 'an4lt',
    channelType: 'p'
  },
  {
    channelName: '3me5t',
    channelType: 'g'
  },
  {
    channelName: 'h59p5s',
    channelType: 'g'
  },
  {
    channelName: 'gsggte',
    channelType: 'g'
  },
  {
    channelName: 'h6qtu',
    channelType: 'p'
  },
  {
    channelName: 'kt4jje',
    channelType: 'g'
  },
  {
    channelName: 'z35zk',
    channelType: 'p'
  },
  {
    channelName: 'crx8fy',
    channelType: 'p'
  },
  {
    channelName: '1ndo8a',
    channelType: 'g'
  },
  {
    channelName: '0d0la2',
    channelType: 'p'
  },
  {
    channelName: 'f0nkzp',
    channelType: 'p'
  },
  {
    channelName: 'trgdv8',
    channelType: 'g'
  },
  {
    channelName: 'nm5zokf',
    channelType: 'g'
  },
  {
    channelName: '0ywaii',
    channelType: 'p'
  },
  {
    channelName: '15uft',
    channelType: 'p'
  },
  {
    channelName: 'lsj74',
    channelType: 'g'
  },
  {
    channelName: '6gbths',
    channelType: 'g'
  },
  {
    channelName: 'z74q3',
    channelType: 'p'
  },
  {
    channelName: 'e4h66t',
    channelType: 'p'
  },
  {
    channelName: '87bdwk',
    channelType: 'g'
  }
]

export default React.memo(() => {
  const router = useRouter()

  return (
    <>
      {channels.map(({ channelName, channelType }) => {
        let chat

        if (channelType === 'p') {
          chat = {
            isPrivate: true,
            displayName: channelName,
            messenger: { nickname: channelName },
            lastMessage: { content: 'hello there my friend' }
          }
        } else {
          chat = {
            isPrivate: false,
            displayName: `#${channelName}`,
            category: { name: channelName },
            lastMessage: { content: 'hello there my friend' }
          }
        }

        const goToChannel = () => {
          Router.push(
            {
              pathname: '/',
              query: {
                channelType,
                channelName,
                userId: router.query.userId
              }
            },
            `/${router.query.userId}/${channelType}/${channelName}`
          )
        }

        return (
          <ChatPreview
            key={channelName}
            chat={chat}
            selected={router.query.channelName === channelName}
            onClick={goToChannel}
          />
        )
      })}
    </>
  )
})
