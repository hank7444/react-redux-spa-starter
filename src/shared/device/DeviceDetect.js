import bowser from 'bowser';

function checkIsIphoneX() {
  // Really basic check for the ios platform
  // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
  const iOS = bowser.ios;

  // Get the device pixel ratio
  const ratio = window.devicePixelRatio || 1;

  // Define the users device screen dimensions
  const screen = {
    width: window.screen.width * ratio,
    height: window.screen.height * ratio,
  };

  // iPhone X Detection
  if (iOS && screen.width === 1125 && screen.height === 2436) {
    return true;
  }

  return false;
}

const isMobile = bowser.mobile;
const isTablet = bowser.tablet;
const isDesktop = !isMobile && !isTablet;
const isAndroid = bowser.android;
const isIOS = bowser.ios;
const isIphoneX = checkIsIphoneX();
const isSafari = bowser.safari;

export default {
  isMobile,
  isTablet,
  isDesktop,
  isAndroid,
  isIOS,
  isIphoneX,
  isSafari,
};
