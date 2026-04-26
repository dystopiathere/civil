import { delay, drawText3D, initialize, prepareInstructionsScaleform } from "./lib";

const exports = global.exports as CitizenExports;

// EXPORT LIB
exports("delay", delay);
exports("initialize", initialize);
exports("drawText3D", drawText3D);
exports("prepareInstructionsScaleform", prepareInstructionsScaleform);
