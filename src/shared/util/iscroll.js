import IScroll from 'iscroll/build/iscroll-probe';

export default class iScrollEnhance extends IScroll {
  constructor(el, options) {

    options.mouseWheelScrollsHorizontally = options.mouseWheelScrollsHorizontally || true;

    super(el, options);
  }

  _wheel(e) {

    if ( !this.enabled ) {
      return;
    }

    e.preventDefault();

    var wheelDeltaX, wheelDeltaY,
      newX, newY,
      that = this;

    if ( this.wheelTimeout === undefined ) {
      that._execEvent('scrollStart');
    }

    // Execute the scrollEnd event after 400ms the wheel stopped scrolling
    clearTimeout(this.wheelTimeout);
    this.wheelTimeout = setTimeout(function () {
      if(!that.options.snap) {
        that._execEvent('scrollEnd');
      }
      that.wheelTimeout = undefined;
    }, 400);

    if ( 'deltaX' in e ) {
      if (e.deltaMode === 1) {
        wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
        wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
      } else {
        wheelDeltaX = -e.deltaX;
        wheelDeltaY = -e.deltaY;
      }
    } else if ( 'wheelDeltaX' in e ) {
      wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
      wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
    } else if ( 'wheelDelta' in e ) {
      wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
    } else if ( 'detail' in e ) {
      wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
    } else {
      return;
    }

    wheelDeltaX *= this.options.invertWheelDirection;
    wheelDeltaY *= this.options.invertWheelDirection;


    // https://github.com/cubiq/iscroll/issues/679 >>> begin
    if (!this.hasHorizontalScroll) {
      wheelDeltaX = 0;
    } else if (!this.hasVerticalScroll && this.options.mouseWheelScrollsHorizontally) {

      // If absolute DeltaX is less than absolute DeltaX
      // Replace DeltaX with DeltaY
      // Otherwise just remove DeltaY and use the actual DeltaX
      if (Math.abs(wheelDeltaX) < Math.abs(wheelDeltaY)) {
        wheelDeltaX = wheelDeltaY;
      }
      wheelDeltaY = 0;
    }

    if (!this.hasVerticalScroll) {
      wheelDeltaY = 0;
    }
    /// >>> end

    if ( this.options.snap ) {
      newX = this.currentPage.pageX;
      newY = this.currentPage.pageY;

      if ( wheelDeltaX > 0 ) {
        newX--;
      } else if ( wheelDeltaX < 0 ) {
        newX++;
      }

      if ( wheelDeltaY > 0 ) {
        newY--;
      } else if ( wheelDeltaY < 0 ) {
        newY++;
      }

      this.goToPage(newX, newY);

      return;
    }

    newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
    newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

    this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
    this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

    if ( newX > 0 ) {
      newX = 0;
    } else if ( newX < this.maxScrollX ) {
      newX = this.maxScrollX;
    }

    if ( newY > 0 ) {
      newY = 0;
    } else if ( newY < this.maxScrollY ) {
      newY = this.maxScrollY;
    }

    this.scrollTo(newX, newY, 0);

    if ( this.options.probeType > 1 ) {
      this._execEvent('scroll');
    }

    // INSERT POINT: _wheel
  }
}
