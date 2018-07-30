import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import ReactIScroll from 'react-iscroll';

import iScroll from 'shared/util/iscroll';
import DeviceDetect from 'shared/device/DeviceDetect';
import { touchDeviceHoverHandler } from 'shared/util/touchDevice';
import Button from 'components/Button/Button';

export default class TouchScrollTip extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    tagName: PropTypes.string,
    direction: PropTypes.string,
    isShowTip: PropTypes.bool,
    hideTipTimeout: PropTypes.number,
    disabled: PropTypes.bool,
    iscrollOptions: PropTypes.object,
    onScrollEnd: PropTypes.func,
    onScrollToBottom: PropTypes.func,
    isAlignItemsToBottom: PropTypes.bool,
    isVisibleOnScreen: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    containerClassName: '',
    tagName: 'div',
    direction: 'vertical',
    isShowTip: true,
    hideTipTimeout: 0,
    disabled: false,
    iscrollOptions: {},
    isAlignItemsToBottom: false,
    isVisibleOnScreen: true,
  };

  static touchmoveControllerInit() {
    if (!DeviceDetect.isDesktop) {
      document.addEventListener('touchmove', (e) => {
        let target = e.target;
        while (target) {
          if (target.getAttribute && target.getAttribute('data-enable-scrolling')) {
            return;
          }
          target = target.parentNode;
        }

        e.preventDefault();
      }, {
          passive: false,
        });
    }
  }

  constructor(props) {
    super(props);

    this.doms = {};
    this.iScrollOptions = this._getIscrollOptions(props);

    if (props.direction === 'vertical') {
      this.toggleBackForwardButton = this.toggleVerticalBackForwardButton.bind(this);
    } else {
      this.toggleBackForwardButton = this.toggleHorizontalBackForwardButton.bind(this);
    }

    this._onScrollEnd = this._onScrollEnd.bind(this);
    this.resize = this.resize.bind(this);

    this.state = {
      isForwardShow: false,
      isBackShow: false,
      showArrow: true,
    };
  }

  componentDidMount() {
    const { isShowTip, hideTipTimeout } = this.props;
    this.doms.iScrollElem.withIScroll(true, (e) => {
      const { isAlignItemsToBottom } = this.props;
      const scrollStatus = this.toggleBackForwardButton(e);
      const { isBackShow, isForwardShow } = scrollStatus;
      const isScrollBarExist = isBackShow || isForwardShow;
      if (isAlignItemsToBottom) {
        this.alignItemsToBottom(isScrollBarExist);
      }
    });

    if (isShowTip && hideTipTimeout !== 0) {
      setTimeout(() => {
        this.setState({ showArrow: false });
      }, hideTipTimeout);
    }

    if (isShowTip) {
      touchDeviceHoverHandler(this.doms.scrollContainer, 'touch-scroll-tip-hover');
    }

    this._toggleDisabled(this.props.disabled);
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    const { isVisibleOnScreen } = this.props;
    const { isVisibleOnScreen: nextIsVisibleOnScreen, isShowTip, hideTipTimeout } = nextProps;

    if (!isVisibleOnScreen && nextIsVisibleOnScreen) {
      if (isShowTip && hideTipTimeout !== 0) {
        this.setState({ showArrow: true });
        setTimeout(() => {
          this.setState({ showArrow: false });
        }, hideTipTimeout);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { children: prevChildren, disabled: prevDisabled } = prevProps;
    const { children, disabled, isAlignItemsToBottom } = this.props;

    if (children !== prevChildren) {
      this.doms.iScrollElem.withIScroll(true, (e) => {
        this.toggleBackForwardButton(e);
      });
    }

    if (isAlignItemsToBottom) {
      const { isBackShow: prevIsBackShow, isForwardShow: prevIsForwardShow } = prevState;
      const { isBackShow, isForwardShow } = this.state;
      const prevIsScrollBarExist = prevIsBackShow || prevIsForwardShow;
      const isScrollBarExist = isBackShow || isForwardShow;

      if (prevIsScrollBarExist && isScrollBarExist) {
        return;
      }

      this.alignItemsToBottom(isScrollBarExist);
    }

    if (disabled !== prevDisabled) {
      this._toggleDisabled(disabled);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  _toggleDisabled(disabled) {
    this.doms.iScrollElem.withIScroll((e) => {
      if (disabled) {
        setTimeout(() => {
          e.disable();
        }, 0);
      } else {
        setTimeout(() => {
          e.enable();
        }, 0);
      }
    });
  }

  _getIscrollOptions(props) {
    const { direction, iscrollOptions } = props;
    const baseOptions = {
      mouseWheel: true,
      scrollbars: true,
      fadeScrollbars: true,
      interactiveScrollbars: true,
      click: false,
      probeType: 2,
      bounce: DeviceDetect.isIOS,
      preventDefault: !DeviceDetect.isDesktop,
      preventDefaultException: { tagName: /.*/ }, // Fix iscroll clicks firing twice bug.
    };

    if (direction === 'vertical') {
      return Object.assign({
        scrollX: false,
        scrollY: true,
      }, baseOptions, iscrollOptions);
    }

    return Object.assign({
      scrollX: true,
      scrollY: false,
    }, baseOptions, iscrollOptions);
  }

  toggleHorizontalBackForwardButton(e) {
    const { x, scrollerWidth, wrapperWidth } = e;
    const scrollLeft = Math.abs(x);

    let isForwardShow;
    let isBackShow;

    if ((scrollLeft + wrapperWidth) < scrollerWidth) {
      isForwardShow = true;
    } else {
      isForwardShow = false;
    }

    if (scrollLeft > 0) {
      isBackShow = true;
    } else {
      isBackShow = false;
    }

    const result = {
      isBackShow,
      isForwardShow,
    };
    this.setState(result);
    return result;
  }

  toggleVerticalBackForwardButton(e) {
    const { y, scrollerHeight, wrapperHeight } = e;
    const scrollTop = Math.abs(y);

    let isForwardShow;
    let isBackShow;

    if ((scrollTop + wrapperHeight) < scrollerHeight) {
      isForwardShow = true;
    } else {
      isForwardShow = false;
    }

    if (scrollTop > 0) {
      isBackShow = true;
    } else {
      isBackShow = false;
    }

    const result = {
      isBackShow,
      isForwardShow,
    };

    this.setState(result);
    return result;
  }

  _onScrollEnd(e) {
    const { direction, onScrollEnd, onScrollToBottom } = this.props;
    const { x, y } = e;
    let isScrollToBottom;

    this.toggleBackForwardButton(e);

    if (direction === 'vertical') {
      isScrollToBottom = Math.abs(e.maxScrollY) - Math.abs(e.y) < 10;
    } else {
      isScrollToBottom = Math.abs(e.maxScrollX) - Math.abs(e.x) < 10;
    }

    if (isScrollToBottom && onScrollToBottom && typeof onScrollToBottom === 'function') {
      onScrollToBottom();
    }

    if (onScrollEnd && typeof onScrollEnd === 'function') {
      onScrollEnd({
        x,
        y,
      });
    }
  }

  refresh() {
    this.doms.iScrollElem.withIScroll((_iScroll) => {
      setTimeout(() => {
        _iScroll.refresh();
      }, 0);
    });
  }

  scrollTo(x, y, isAnimated = true) {
    this.doms.iScrollElem.withIScroll((_iScroll) => {
      if (isAnimated) {
        _iScroll.scrollTo(x, y, 1000);
      } else {
        _iScroll.scrollTo(x, y);
        this.toggleBackForwardButton(_iScroll);
      }
    });
  }

  scrollToNext = () => {
    const iscroll = this.doms.iScrollElem.getIScroll();
    const { x, wrapperWidth, maxScrollX } = iscroll;
    const toX = x - wrapperWidth < maxScrollX ? maxScrollX : x - wrapperWidth;
    this.scrollTo(toX, 0);
  }

  scrollToPrev = () => {
    const iscroll = this.doms.iScrollElem.getIScroll();
    const { x, wrapperWidth } = iscroll;
    const toX = x + wrapperWidth > 0 ? 0 : x + wrapperWidth;
    this.scrollTo(toX, 0);
  }

  alignItemsToBottom(isScrollBarExist) {
    const { iScrollElem, scrollContainer, scrollContent } = this.doms;
    if (isScrollBarExist) {
      iScrollElem.withIScroll((e) => {
        e.enable();
        e.scrollTo(0, 0);
      });
    } else {
      const containerHeight = scrollContainer.offsetHeight;
      const contentHeight = scrollContent.scrollHeight;
      const gapY = containerHeight - contentHeight;

      scrollContent.style.transform = `translate(0px, ${gapY}px)`;
      iScrollElem.withIScroll((e) => {
        e.disable();
      });
    }
  }

  resize() {
    this.doms.iScrollElem.withIScroll(true, (e) => {
      e.refresh();
      const { isAlignItemsToBottom } = this.props;
      const scrollStatus = this.toggleBackForwardButton(e);

      const { isBackShow, isForwardShow } = scrollStatus;
      const isScrollBarExist = isBackShow || isForwardShow;
      const prevIsScrollBarExist = this.state.isBackShow || this.state.isForwardShow;
      if (prevIsScrollBarExist && isScrollBarExist) {
        return;
      }

      if (isAlignItemsToBottom) {
        this.alignItemsToBottom(isScrollBarExist);
      }
    });
  }

  render() {
    const { iScrollOptions } = this;
    const {
      children,
      className,
      containerClassName,
      direction,
      tagName: TagName,
      isShowTip,
    } = this.props;
    const { isForwardShow, isBackShow, showArrow } = this.state;
    const directionClassName = direction === 'vertical' ? 'vertical-scroller' : 'horizontal-scroller';

    if (isShowTip) {
      const containerClass = classname('touch-scroll-tip', containerClassName, directionClassName, { 'has-forward-indicator': isForwardShow, 'has-back-indicator': isBackShow });
      const tipContainerClass = showArrow ? 'touch-scroll-tip-timeout' : '';
      const prevTipsHiddenClass = isBackShow ? '' : 'tip-arrow-disabled';
      const nextTipsHiddenClass = isForwardShow ? '' : 'tip-arrow-disabled';
      return (
        <div className={`${containerClass} ${tipContainerClass}`} ref={(ref) => { this.doms.scrollContainer = ref; }}>
          <ReactIScroll
            ref={(ref) => {
              if (ref) {
                this.doms.iScrollElem = ref;
              }
            }}
            iScroll={iScroll}
            options={iScrollOptions}
            onScroll={this.toggleBackForwardButton}
            onScrollEnd={this._onScrollEnd}
          >
            <TagName className={`touch-scroll-tip-body ${className}`} ref={(ref) => { this.doms.scrollContent = ref; }}>
              {children}
            </TagName>
          </ReactIScroll>
          <Button
            className={`tip-arrow backward-tip ${prevTipsHiddenClass}`}
            hoverClassName="tip-arrow-hover"
            onClick={this.scrollToPrev}
          />
          <Button
            className={`tip-arrow forward-tip ${nextTipsHiddenClass}`}
            hoverClassName="tip-arrow-hover"
            onClick={this.scrollToNext}
          />
        </div>
      );
    }

    return (
      <div className={`touch-scroll-tip ${containerClassName} ${directionClassName}`} ref={(ref) => { this.doms.scrollContainer = ref; }}>
        <ReactIScroll
          ref={(ref) => {
            if (ref) {
              this.doms.iScrollElem = ref;
            }
          }}
          iScroll={iScroll}
          options={iScrollOptions}
          onScrollEnd={this._onScrollEnd}
        >
          <TagName className={`${className}`} ref={(ref) => { this.doms.scrollContent = ref; }}>
            {children}
          </TagName>
        </ReactIScroll>
      </div>
    );
  }
}
