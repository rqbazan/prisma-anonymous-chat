require('dotenv').config()
const withCSS = require('@zeit/next-css')

console.log(
  `[frontend:next.config.js]: process.env.API_URL=${process.env.API_URL}`
)

module.exports = withCSS({
  useFileSystemPublicRoutes: false,
  env: {
    API_URL: process.env.API_URL
  }
})
