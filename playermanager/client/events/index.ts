import onEntityDamage from './on-entity-damage'

const eventHandlers: Record<string, (args: any[]) => void> = {
  CEventNetworkEntityDamage: onEntityDamage
}

on('gameEventTriggered', (name: string, args: any[]) => {
  if (eventHandlers[name]) {
    eventHandlers[name](args)
  } else {
    console.log(`Game event ${name} ${args.join(', ')}`)
  }
})