import pluginTypescript from '@rollup/plugin-typescript'
import pluginDts from 'rollup-plugin-dts'

import { main, types } from './package.json'

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: 'src/index.ts',
    output: {
      file: main,
      format: 'esm',
    },
    plugins: [pluginTypescript()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: types,
      format: 'esm',
    },
    plugins: [pluginDts()],
  },
]
