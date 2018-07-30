function addMultipleListeners(element, events, handler, useCapture, args) {

  if (!(events instanceof Array)) {
    throw new Error('addMultipleListeners: please supply an array of eventstrings(like ["click","mouseover"])');
  }

  // create a wrapper to be able to use additional arguments
  const handlerFn = (e) => {
    handler.apply(this, args && args instanceof Array ? args : []);
  };
  const eventsLength = events.length;

  for (let i = 0; i < eventsLength; i +=1 ) {
    element.addEventListener(events[i], handlerFn, useCapture);
  }
}

export function touchDeviceHoverHandler(target, className) {
  const classAry = className.split(' ');
  addMultipleListeners(target, ['mouseover', 'touchstart'], () => {
    target.classList.add(...classAry);
  });

  addMultipleListeners(target, ['mouseout', 'touchend'], () => {
    target.classList.remove(...classAry);
  });
}
