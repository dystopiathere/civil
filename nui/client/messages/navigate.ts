
const exports = global.exports as CitizenExports

function navigate (page: string) {
  SendNuiMessage(JSON.stringify({
    name: 'navigate',
    data: {
      page
    }
  }))
}

exports('navigate', navigate)