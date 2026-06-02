export const production = process.argv.findIndex((argItem) => argItem === "--mode=production") >= 0;
