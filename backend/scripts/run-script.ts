import readline from 'readline'

function confirm(message: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => {
    rl.question(`${message} [Y/n]: `, answer => {
      const yes = answer === 'Y'
      if (yes) {
        console.log('Go ahead then 🎉')
      } else {
        console.log('Ok, no problem 🛑')
      }
      resolve(yes)
    })
  })
}

export default async function runSafeScript(script: () => Promise<void>) {
  const prod = process.env.NODE_ENV === 'production'

  if (prod) {
    console.log('🔥 YOU ARE ON PRODUCTION MODE 🔥')
  }

  async function runScript() {
    try {
      await script()
      console.log('Script execution completed ✅')
      process.exit(0)
    } catch (error) {
      console.log('Script execution failed ❌')
      console.log(error)
      process.exit(1)
    }
  }

  if (!prod) {
    return runScript()
  }

  if (await confirm('Are you sure?')) {
    return runScript()
  }

  return process.exit(0)
}
