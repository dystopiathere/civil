const { build } = require('esbuild')
const { copy } = require('esbuild-plugin-copy')

const production = process.argv.findIndex(argItem => argItem === '--mode=production') >= 0

const resourceName = 'database'

const onRebuild = (context) => {
  return async (err, res) => {
    if (err) {
      return console.error(`[${context}]: Rebuild failed`, err)
    }

    console.log(`[${context}]: Rebuild succeeded, warnings:`, res.warnings)
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

for (const context of ['client', 'server']) {
  build({
    bundle: true,
    entryPoints: [`${context}/${context}.ts`],
    outfile: `../../resources/[main]/${resourceName}/dist/${context}.js`,
    watch: production ? false : {
      onRebuild: onRebuild(context),
    },
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: './fxmanifest.lua',
            to: `../../resources/[main]/${resourceName}/fxmanifest.lua`,
            watch: !production,
          },
          {
            from: './.env',
            to: `../../resources/[main]/${resourceName}/.env`,
            watch: !production,
          },
          {
            from: './node_modules/**/*',
            to: `../../resources/[main]/${resourceName}/node_modules/`,
            watch: false,
          },
        ]
      }),
    ],
    ...(context === 'client' ? client : server),
  })
    .then(() => {
      console.log(`[${context}]: Built successfully!`)
    })
    .catch(() => process.exit(1))
}