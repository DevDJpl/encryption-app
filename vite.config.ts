/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
//import { SvgTemplate } from './src/SvgTemplate.tsx';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        svgr({
            svgrOptions: {
                icon: true,
                expandProps: 'end',
                exportType: 'default',
                ref: true,
                svgo: false,
                titleProp: true,
            },
            include: '**/*.svg', 
        }),
        nodePolyfills({
            protocolImports: true,
        }),
    ],
    resolve: {
        alias: {
            crypto: 'crypto-browserify',
            stream: 'stream-browserify',
            //"react": resolve(__dirname, './node_modules/dev-react'),
            //"react-dom": resolve(__dirname, './node_modules/dev-react-dom')
        }
    },
    /*
    resolve: {
        alias: {
            "@types/app__react-dom": resolve(__dirname, './libs/@types/react-dom'),
            "@app/react": resolve(__dirname, './libs/react-experimental'),
            "@app/react-dom": resolve(__dirname, './libs/react-dom-experimental'),
            "@app/scheduler": resolve(__dirname, './libs/scheduler-experimental')
        }
    },
    */
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: '.vitest/setup.ts',
    },
    preview: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
