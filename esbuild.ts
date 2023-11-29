import { builtinModules } from 'node:module';
import { type BuildOptions } from 'esbuild';
import { context } from 'esbuild';

const common: BuildOptions = {
  outdir: 'dist',
  bundle: true,
  minify: false,
  sourcemap: false,
  define: {
    DEBUG: 'true',
  },
};

const main: BuildOptions = {
  ...common,
  tsconfig: './tsconfig.json',
  entryPoints: ['./src/index.ts'],
  platform: 'node',
  target: 'node18',
  external: [...builtinModules.flatMap(p => [p, `node:${p}`])],
};

const watch = async () => {
  const mainCtx = await context({ ...main });
  await mainCtx.watch();
};

watch();
