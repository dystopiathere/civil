import { init } from "./lib";

const exports = global.exports as CitizenExports;

exports.civil_helpers.initialize(GetCurrentResourceName(), init);
