import { onEntityDamageHandler } from './events'

on('gameEventTriggered', (name: string, args: any[]) => {
  if (name === 'CEventNetworkEntityDamage') {
    onEntityDamageHandler(args)
  }
})