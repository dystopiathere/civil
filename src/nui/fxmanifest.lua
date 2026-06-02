fx_version 'cerulean'
game 'gta5'

author 'Kirill Kuznetsov'
version '1.0.0'

node_version '22'

-- ui_page 'http://localhost:5173'
ui_page 'dist/index.html'

client_script 'dist/client.js'

files {'dist/**/*'}

dependencies {'core'}
