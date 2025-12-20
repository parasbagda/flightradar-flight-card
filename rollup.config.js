import fs from 'fs';
import path from 'path';

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import virtual from '@rollup/plugin-virtual';
import { defineConfig } from 'rollup';
import serve from 'rollup-plugin-serve';

const dev = !!process.env.ROLLUP_WATCH;

const lastCommitHash = fs.readFileSync('.git/refs/heads/main', 'utf8').trim();
const ghCommitRepositoryUrl = `https://raw.githubusercontent.com/plckr/flightradar-flight-card/${lastCommitHash}`;

export default defineConfig(() => ({
  input: 'src/index.ts',
  output: {
    file: 'dist/flightradar-flight-card.js',
    format: 'es',
    inlineDynamicImports: true,
    sourcemap: dev,
  },
  plugins,
  watch: {
    clearScreen: false,
  },
}));

const airlineLogos = fs
  .readdirSync('./public/flightaware_logos')
  .filter((f) => f.endsWith('.png'))
  .map((f) => path.basename(f, '.png'));

const plugins = [
  replace({
    __LOGOS_URL__: dev
      ? 'http://localhost:4000/flightaware_logos'
      : `${ghCommitRepositoryUrl}/public/flightaware_logos`,
    include: 'src/**/*.ts',
    preventAssignment: true,
  }),
  virtual({
    'virtual:airline-logos': `export const AIRLINE_LOGOS = ${JSON.stringify(airlineLogos)};`,
  }),
  resolve({ browser: true }),
  commonjs(),
  json(),
  typescript({
    tsconfig: './tsconfig.json',
    sourceMap: dev,
    inlineSources: dev,
  }),
];

if (dev) {
  plugins.push(
    serve({
      contentBase: ['./dist', './public'],
      host: '0.0.0.0',
      port: 4000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  );
} else {
  plugins.push(
    terser({
      format: {
        comments: false,
      },
    })
  );
}
