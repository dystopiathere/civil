fx_version 'cerulean'
game 'gta5'

author 'Kirill Kuznetsov'
version '1.0.0'

node_version '22'

resource_type 'gametype' {
    name = 'Base gametype'
}

client_script 'dist/client.js'

dependencies {'core', 'nui'}
