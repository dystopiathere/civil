export const BANNER_CONFIG = {
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
