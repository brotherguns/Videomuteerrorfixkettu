import { nodeResolve } from "@rollup/plugin-node-resolve";
import { swc } from "rollup-plugin-swc3";

export default {
    input: "src/index.ts",
    output: {
        file: "dist/index.js",
        format: "iife",
        globals: {
            "@vendetta/metro":   "vendetta.metro",
            "@vendetta/patcher": "vendetta.patcher",
            "@vendetta/plugin":  "vendetta.plugin",
            "@vendetta/utils":   "vendetta.utils",
        }
    },
    // Treat vendetta imports as runtime-provided globals, not bundled deps
    external: [
        "@vendetta/metro",
        "@vendetta/patcher",
        "@vendetta/plugin",
        "@vendetta/utils",
    ],
    plugins: [
        nodeResolve(),
        swc({
            tsconfig: false,
            jsc: {
                parser: { syntax: "typescript" },
                target: "es2022"
            }
        })
    ]
};
