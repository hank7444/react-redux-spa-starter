export function getParentUrl() {
  return window.location !== window.parent.location ? document.referrer : document.location.href;
}
