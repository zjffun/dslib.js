import rollupTypescript  from 'rollup-plugin-typescript';

const inputs = ['src/list.ts'];
export default {
  input: inputs,
  plugins: [
    rollupTypescript()
  ],
  output: {
    dir: 'dist',
    format: 'cjs',
    sourceMap: 'inline'
  },
  watch: {
    include: 'src/**'
  }
};