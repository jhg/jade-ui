import { resolve } from 'path';
import fs from 'fs';
import minifyHtml from 'rollup-plugin-minify-html-literals';

const BANNER = `/**
 * @license
 * Copyright ${new Date().getFullYear()}
 * SPDX-License-Identifier: Unlicense
 */`;

function componentsEntries() {
    const componentsDir = resolve(__dirname, 'src/components');
    let entries = {};

    fs.readdirSync(componentsDir).forEach((dir) => {
        const componentPath = resolve(componentsDir, dir, 'index.ts');
        if (fs.existsSync(componentPath)) {
          entries[`components/${dir}`] = componentPath;
        }
      });

    return entries;
}

/** @type {import('vite').UserConfig} */
export default {
    resolve: {
        alias: {
            '@shared': resolve(__dirname, 'src/shared'),
            '@components': resolve(__dirname, 'src/components'),
        }
    },
    esbuild: {
        legalComments: 'none',
        minify: true,
        treeShaking: true,
        format: 'esm',
        banner: BANNER
    },
    build: {
        lib: {
            entry: {
                'jade-ui': resolve(__dirname, 'src/main.ts'),
                ...componentsEntries(),
            },
            formats: ['es']
        },
        minify: true,
        rollupOptions: {
            external: ['lit'],
            output: {
                globals: {
                    lit: 'Lit'
                },
                compact: true
            },
            treeshake: {
                preset: 'smallest',
                moduleSideEffects: false,
                propertyReadSideEffects: false,
                tryCatchDeoptimization: false,
                unknownGlobalSideEffects: false
            }
        }
    },
    plugins: [
        minifyHtml.default(),
    ]
}
