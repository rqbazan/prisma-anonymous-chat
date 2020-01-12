const tsConfigPaths = require('tsconfig-paths')
const dotenv = require('dotenv')
const { compilerOptions } = require('./tsconfig.json')

dotenv.config()

tsConfigPaths.register({
  baseUrl: compilerOptions.outDir,
  paths: compilerOptions.paths
})
