require('dotenv').config()
const withCSS = require('@zeit/next-css')

console.log(
  `[frontend:next.config.js]: process.env.SERVER_URL=${process.env.SERVER_URL}`
)

module.exports = withCSS({
  useFileSystemPublicRoutes: false,
  env: {
    SERVER_URL: process.env.SERVER_URL
  }
})
