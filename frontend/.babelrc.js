const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['styled-components', { ssr: true, displayName: dev, fileName: dev }],
    ['graphql-tag'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '~': './frontend/src'
        }
      }
    ]
  ]
}
