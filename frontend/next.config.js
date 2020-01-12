require('dotenv').config()

console.log(
  '[frontend:next.config.js]: process.env.API_URL=',
  process.env.API_URL
)

module.exports = {
  env: {
    API_URL: process.env.API_URL
  }
}
