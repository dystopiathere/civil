import { delay, initialize } from "./lib";

const exports = global.exports as CitizenExports;

// EXPORT LIB
exports("delay", delay);
exports("initialize", initialize);
