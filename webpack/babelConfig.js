module.exports = {
  presets: [
    [
      'env',
      {
        'browsers': [
          'Chrome >= 52',
          'FireFox >= 44',
          'Safari >= 7',
          'Explorer >= 9',
          'last 4 Edge versions',
        ],
        'useBuiltIns': true, // A way to apply babel-preset-env for polyfills (via babel-preset-env).
        'modules': false,
      },
    ],
    'es2015',
    'stage-0',
    'react',
  ],
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy',
    'transform-class-properties',
  ],
};


/*
es2015 is to fix rangeslider import problem

WARNING in ./src/components/fittingRoom/avatarWebGL/AvatarWebGL.js
423:30-36 "export 'default' (imported as 'Slider') was not found in 'components/thirdParty/react-rangeslider/rangeslider'
 @ ./src/components/fittingRoom/avatarWebGL/AvatarWebGL.js
 @ ./src/containers/Fittingroom/subPage/AvatarList.js
 @ ./src/containers/Fittingroom/subPage/SubPage.js
 @ ./src/containers/Fittingroom/Fittingroom.js
 @ ./src/route.js
 @ ./src/index.js
 @ multi ./src/index.js
*/
