module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Direciona para o ambiente Node.js atual
        },
        modules: 'commonjs', // Garante que o Babel transpile os módulos para CommonJS
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'transform-remove-console',
  ],
  compact: false,
  generatorOpts: {
    retainLines: true,
    compact: false,
    minified: false,
  },
};
