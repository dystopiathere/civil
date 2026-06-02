# SERVER CONFIGURATION

1. Get latest server artifact at:
   1. Windows: https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/
   2. Linux: https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/
2. Extract archive data into ./artifact folder
3. Copy ./variables.cfg.example to ./variables.cfg and configure license key, steam web api key, database credentials and rcon password
4. Copy ./.env.example to ./.env and configure database credentials
5. Run git submodule update --init
6. Link submodule resources to [base] resource group
   1. Windows: mklink /d resources\\[base] ..\vendor\server-data\resources
   2. Linux: ln -s ../vendor/server-data/resources/ 'resources/[base]/'
7. Run pnpm install
8. Run pnpm dev
9. Run docker compose up -d
10. Run start.cmd (for Windows)
