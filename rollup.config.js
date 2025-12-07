import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';

const dev = !!process.env.ROLLUP_WATCH;

const serveOptions = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 4000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

export default {
  input: 'src/flightradar-flight-card.ts',
  output: {
    file: 'dist/flightradar-flight-card.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: dev,
      inlineSources: dev,
    }),
    dev
      ? serve(serveOptions)
      : terser({
          format: {
            comments: false,
          },
        }),
  ],
  watch: {
    clearScreen: false,
  },
};
