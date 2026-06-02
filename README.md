# SERVER CONFIGURATION

1. Get latest server artifact at:
   1. Windows: https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/
   2. Linux: https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/
2. Extract archive data into ./artifact folder
3. Copy ./server.cfg.example to ./server.cfg and configure sv_licenseKey and rcon_password properties
4. Copy ./variables.cfg.example to ./variables.cfg and configure steam web api key and database credentials
5. Copy ./.env.example to ./.env and configure database credentials
6. Run pnpm install
7. Run pnpm dev
8. Run docker compose up -d
9. Run start.cmd (for Windows)
