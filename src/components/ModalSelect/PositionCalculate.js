export default {
  getFloatPosition($elem, $reletiveElem, $viewport) {
    const viewportWidth = $viewport.width();
    const viewportHeight = $viewport.height();
    const position = $reletiveElem.offset();
    const relativeWidth = $reletiveElem.outerWidth();
    const relativeHalfWidth = relativeWidth / 2;
    const width = $elem.outerWidth();
    const height = $elem.outerHeight();
    const halfWidth = width / 2;
    let left = position.left + relativeHalfWidth;
    let top = position.top;

    if (left + halfWidth > viewportWidth) {
      left = viewportWidth - width;
    } else {
      left -= halfWidth;
    }

    if (position.top + height > viewportHeight) {
      top = viewportHeight - height;
    }

    if (left < 0) {
      left = 0;
    }

    if (top < 0) {
      top = 0;
    }

    return {
      left,
      top,
    };
  },
  getFloatBottomPosition($elem, $reletiveElem, $viewport) {
    const viewportHeight = $viewport.height();
    const position = $reletiveElem.offset();
    const relativeWidth = $reletiveElem.outerWidth();
    const relativeHeight = $reletiveElem.outerHeight();
    const height = $elem.outerHeight();
    let align = 'bottom';
    let left = position.left;
    let top = position.top + relativeHeight;

    if (position.top + height > viewportHeight) {
      top = position.top - height;
      align = 'top';
    }

    if (left < 0) {
      left = 0;
    }

    if (top < 0) {
      top = 0;
    }

    return {
      width: relativeWidth,
      left,
      top,
      align,
    };
  },
};
