import React from 'react'
import Search from './search'
import Config from './config'
import Add from './add'
import Back from './back'

const icons = {
  search: Search,
  config: Config,
  add: Add,
  back: Back
}

export default function Icon({ name, size = 32, ...props }) {
  const C = icons[name]

  if (!C) {
    console.error(`There is no a icon named: ${name}`)
  }

  return <C width={size} height={size} {...props} />
}
