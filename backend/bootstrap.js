const tsConfigPaths = require('tsconfig-paths')
const dotenv = require('dotenv')
const { compilerOptions } = require('./tsconfig.json')

dotenv.config()

tsConfigPaths.register({
  baseUrl: './backend/dist',
  paths: compilerOptions.paths
})
