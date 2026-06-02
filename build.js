import { build } from "esbuild";
import { copy } from "esbuild-plugin-copy";
import fs from "node:fs";

const production = process.argv.findIndex((argItem) => argItem === "--mode=production") >= 0;

const resources = {};

const modules = ["db", "core", "nui", "map"];

const files = fs.readdirSync("./src");

files.forEach((file) => {
  if (modules.includes(file)) {
    const clientExists = fs.existsSync(`./src/${file}/client`);
    const serverExists = fs.existsSync(`./src/${file}/server`);
    const frontendExists = fs.existsSync(`./src/${file}/frontend`);

    resources[file] = { clientExists, serverExists, frontendExists };
  }
});

const onRebuild = (resourceName, context) => {
  return async (err, res) => {
    if (err) {
      return console.error(`[${resourceName}:${context}]: Rebuild failed`, err);
    }

    console.log(`[${resourceName}:${context}]: Rebuild succeeded, warnings:`, res.warnings);
  };
};

const server = {
  platform: "node",
  target: ["node16"],
  format: "cjs",
};

const client = {
  platform: "browser",
  target: ["chrome93"],
  format: "iife",
};

const banner = {
  js: `
      var _resPath = GetResourcePath(GetCurrentResourceName()) + '/server';
      var __dirname = _resPath;
      var __filename = _resPath + '/dist/server.js';
      global.__dirname = __dirname;
      global.__filename = __filename;
      if (!global.require) global.require = require;
      if (!process.mainModule) process.mainModule = { filename: __filename };
      if (!require.main) require.main = { filename: __filename };
    `,
};

Object.entries(resources).forEach(([resourceName, { clientExists, serverExists, frontendExists }]) => {
  const contexts = [];

  if (clientExists) {
    contexts.push("client");
  }

  if (serverExists) {
    contexts.push("server");
  }

  const targetResourceName = resourceName.replaceAll("-", "_");

  const resourcePath = `./src/${resourceName}`;
  const targetPath = `./resources/[main]/${targetResourceName}`;

  for (const context of contexts) {
    const assets = [
      {
        from: `${resourcePath}/fxmanifest.lua`,
        to: `${targetPath}/fxmanifest.lua`,
        watch: !production,
      },
    ];

    if (frontendExists) {
      assets.push({
        from: `${resourcePath}/frontend/dist`,
        to: `${targetPath}/dist`,
        watch: false,
      });
    }

    build({
      bundle: true,
      sourcemap: true,
      keepNames: true,
      outfile: `${targetPath}/dist/${context}.js`,
      entryPoints: [`${resourcePath}/${context}/index.ts`],
      plugins: [copy({ resolveFrom: "cwd", assets })],
      watch: production ? false : { onRebuild: onRebuild(resourceName, context) },
      banner: resourceName === "db" ? banner : undefined,
      ...(context === "client" ? client : server),
    })
      .then(() => {
        console.log(`[${resourceName}:${context}]: Built successfully!`);
      })
      .catch(() => process.exit(1));
  }
});
