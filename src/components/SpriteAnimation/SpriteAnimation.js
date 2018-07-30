import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class SpriteAimation extends Component {
  static propTypes = {
    className: PropTypes.string,
    imgSrc: PropTypes.string,
    imgWidth: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    fps: PropTypes.number,
    pauseFrames: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    imgSrc: '',
    width: 100,
    height: 100,
    frameNum: 0,
    fps: 30,
  };

  constructor(props) {
    super(props);

    const { imgWidth, width, fps } = props;

    this.fps = 1000 / fps;
    this.canvas = null;
    this.frameIndex = 0;
    this.frameNum = imgWidth / width;
    this.loopTimer = null;

    this.sprite = this.sprite.bind(this);
    this.animationStart = this.animationStart.bind(this);
  }

  componentDidMount() {
    const { imgSrc } = this.props;

    this.img = new Image();
    this.img.src = imgSrc;

    this.img.onload = () => {
      this.animationStart();
    };
  }

  componentWillUnmount() {
    this._isUnmount = true;
    clearTimeout(this.loopTimer);
  }

  sprite() {
    const { frameIndex, frameNum } = this;
    const { width, height } = this.props;
    const context = this.canvas.getContext('2d');

    const sourceX = frameIndex * width;
    const sourceY = 0;

    context.clearRect(0, 0, width, height);
    context.drawImage(this.img, sourceX, sourceY, width, height, 0, 0, width, height);

    this.frameIndex = frameIndex === frameNum - 1 ? 0 : this.frameIndex + 1;
  }

  animationStart() {
    if (this._isUnmount) {
      return;
    }

    const { fps, frameIndex } = this;
    const { pauseFrames } = this.props;

    const pauseFrame = pauseFrames[frameIndex];

    this.loopTimer = setTimeout(() => {
      window.requestAnimationFrame(this.animationStart);
      return this.sprite();
    }, fps);

    if (pauseFrame) {
      clearTimeout(this.loopTimer);
      this.loopTimer = setTimeout(() => {
        window.requestAnimationFrame(this.animationStart);
        return this.sprite();
      }, pauseFrame);
    }
  }

  render() {
    const { className, width, height } = this.props;

    return (
      <canvas
        ref={ref => this.canvas = ref}
        className={`sprite-animation ${className}`}
        width={width}
        height={height}
      />
    );
  }
}
