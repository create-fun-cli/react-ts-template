module.exports = {
  extends: ['@chaos1ee/react'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['views', './src/views'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {},
}
