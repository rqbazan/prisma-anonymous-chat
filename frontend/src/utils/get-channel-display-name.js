export const channelTypes = {
  PRIVATE: 'p',
  GROUP: 'g'
}

export default function getChannelDisplayName(channelName, channelType) {
  return channelTypes.PRIVATE === channelType ? channelName : `#${channelName}`
}
