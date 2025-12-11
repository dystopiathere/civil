import { playAnimation, playAnimationChain } from "./lib";
import "./cmd";

// @ts-ignore
const exports = global.exports as CivilExports;

// EXPORT LIB
exports("playAnimation", playAnimation);
exports("playAnimationChain", playAnimationChain);
