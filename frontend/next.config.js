require('dotenv').config()

console.log(
  `[frontend:next.config.js]: process.env.SERVER_URL=${process.env.SERVER_URL}`
)

module.exports = {
  useFileSystemPublicRoutes: false,
  env: {
    SERVER_URL: process.env.SERVER_URL
  }
}
