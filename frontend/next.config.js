require('dotenv').config()

console.log(
  '[frontend:next.config.js]: process.env.API_URL=',
  process.env.API_URL
)

module.exports = {
  useFileSystemPublicRoutes: false,
  env: {
    API_URL: process.env.API_URL
  }
}
