const { build } = require('esbuild')
const { copy } = require('esbuild-plugin-copy')
const fs = require('node:fs')

const production = process.argv.findIndex(argItem => argItem === '--mode=production') >= 0

const resources = {}

const files = fs.readdirSync('.')

files.forEach((file) => {
  if (file.startsWith('civil-')) {
    const clientExists = fs.existsSync(`./${file}/client`)
    const serverExists = fs.existsSync(`./${file}/server`)
    const frontendExists = fs.existsSync(`./${file}/frontend`)

    resources[file] = { clientExists, serverExists, frontendExists }
  }
})

const onRebuild = (resourceName, context) => {
  return async (err, res) => {
    if (err) {
      return console.error(`[${resourceName}:${context}]: Rebuild failed`, err)
    }

    console.log(`[${resourceName}:${context}]: Rebuild succeeded, warnings:`, res.warnings)
  }
}

const server = {
  platform: 'node',
  target: ['node16'],
  format: 'cjs',
}

const client = {
  platform: 'browser',
  target: ['chrome93'],
  format: 'iife',
}

Object.entries(resources).forEach(([resourceName, { clientExists, serverExists, frontendExists }]) => {
  const contexts = []

  if (clientExists) {
    contexts.push('client')
  }

  if (serverExists) {
    contexts.push('server')
  }

  const targetResourceName = resourceName.replaceAll('-', '_')

  const resourcePath = `./${resourceName}`
  const targetPath = `../resources/[main]/${targetResourceName}`

  for (const context of contexts) {
    const assets = [
      {
        from: `${resourcePath}/fxmanifest.lua`,
        to: `${targetPath}/fxmanifest.lua`,
        watch: !production,
      },
      {
        from: `${resourcePath}/node_modules/**/*`,
        to: `${targetPath}/node_modules/`,
        watch: false,
      },
    ]

    if (frontendExists) {
      assets.push({
        from: `${resourcePath}/frontend/dist/**/*`,
        to: `${targetPath}/dist/`,
        watch: !production,
      },)
    }

    build({
      bundle: true,
      entryPoints: [`${resourcePath}/${context}/${context}.ts`],
      outfile: `${targetPath}/dist/${context}.js`,
      watch: production ? false : {
        onRebuild: onRebuild(resourceName, context),
      },
      plugins: [
        copy({ resolveFrom: 'cwd', assets }),
      ],
      ...(context === 'client' ? client : server),
    })
      .then(() => {
        console.log(`[${resourceName}:${context}]: Built successfully!`)
      })
      .catch(() => process.exit(1))
  }
})