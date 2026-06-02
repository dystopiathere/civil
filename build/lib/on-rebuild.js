import { restartFiveMResource, syncStaticAssets } from "./index.js";

export function onRebuild(resourceName, context, resourcePath, targetPath, frontendExists) {
  return async (err, res) => {
    if (err) {
      return console.error(`[${resourceName}:${context}]: Rebuild failed`, err);
    }

    syncStaticAssets(resourceName, resourcePath, targetPath, false);
    console.log(`[${resourceName}:${context}]: Rebuild succeeded, warnings:`, res.warnings);

    restartFiveMResource(resourceName);
  };
}
