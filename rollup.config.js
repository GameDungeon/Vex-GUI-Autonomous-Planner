import node_resolve from '@rollup/plugin-node-resolve';
import static_files from 'rollup-plugin-static-files';
import { terser } from 'rollup-plugin-terser';
import hotcss from 'rollup-plugin-hot-css';
import commonjs from 'rollup-plugin-commonjs-alternate';
import json from "@rollup/plugin-json";


let config = {
    input: './src/main.js',
    output: {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]'
    },
    treeshake: {
        moduleSideEffects: ['konva'],
    },
    plugins: [
        json(),
        node_resolve({
            browser: true,
        }),
        commonjs(),
        hotcss({
            file: 'styles.css',
            extensions: ['.css', '.scss'],
            loaders: ['scss'],
        }),
    ],
}

if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
        static_files({
            include: ['./public']
        }),
        terser()
    ]);
}

export default config;
