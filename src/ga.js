window.ga = window.ga || function (...args) { (ga.q = ga.q || []).push(args); }; ga.l = +new Date();

ga('create', __GA_TRACK_ID__, 'auto');

export function sendGALog(category = '', action = 'click', label = '') {
  let finalLabel = label || '';

  finalLabel = typeof finalLabel === 'object' ? JSON.stringify(finalLabel) : finalLabel;

  ga('send', 'event', {
    eventCategory: category,
    eventAction: action,
    eventLabel: finalLabel,
  });
}
