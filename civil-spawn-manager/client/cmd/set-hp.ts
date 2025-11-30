// @ts-ignore
const exports = global.exports as CitizenExports

RegisterCommand('hp', async (source: number, args: string[], raw: string) => {
  exports.playermanager.setPlayerState({health: Number(args[0])})
}, false)