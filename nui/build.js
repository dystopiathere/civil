const { build } = require('esbuild')
const { copy } = require('esbuild-plugin-copy')

const production = process.argv.findIndex(argItem => argItem === '--mode=production') >= 0

const resourceName = 'nui'

const onRebuild = (context) => {
  return async (err, res) => {
    if (err) {
      return console.error(`[${context}]: Rebuild failed`, err)
    }

    console.log(`[${context}]: Rebuild succeeded, warnings:`, res.warnings)
  }
}

build({
  bundle: true,
  entryPoints: [`client/client.ts`],
  outfile: `../../resources/[main]/${resourceName}/dist/client.js`,
  watch: production ? false : {
    onRebuild: onRebuild('client'),
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
          from: './node_modules/**/*',
          to: `../../resources/[main]/${resourceName}/node_modules/`,
          watch: false,
        },
        {
          from: './frontend/dist/**/*',
          to: `../../resources/[main]/${resourceName}/dist/`,
          watch: !production,
        },
      ]
    }),
  ],
  platform: 'browser',
  target: ['chrome93'],
  format: 'iife',
})
  .then(() => {
    console.log(`[client]: Built successfully!`)
  })
  .catch(() => process.exit(1))