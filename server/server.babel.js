require('babel-core/register')({
  presets: [
    ['env', {
      targets: {
        node: 'current',
      },
    }],
  ],
});
