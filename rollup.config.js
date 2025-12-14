import fs from 'fs';
import path from 'path';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import virtual from '@rollup/plugin-virtual';
import { defineConfig } from 'rollup';
import serve from 'rollup-plugin-serve';

const dev = !!process.env.ROLLUP_WATCH;

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
  virtual({
    'virtual:airline-logos': `export const AIRLINE_LOGOS = ${JSON.stringify(airlineLogos)};`,
  }),
  resolve({ browser: true }),
  commonjs(),
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
