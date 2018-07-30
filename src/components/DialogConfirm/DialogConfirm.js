import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import withI18N from 'shared/intl/withI18N';
import Button from 'components/Button/Button';

@withI18N
export default class DialogConfirm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.defaultOption = {
      type: 'success',
      text: '',
      btnText: 'OK',
      okCallback: () => {},
    };

    this.state = {
      options: this.defaultOption,
      isShow: false,
    };
  }

  _handleBtnOkOnClick = (e) => {
    e.preventDefault();

    const { okCallback } = this.state.options;

    if (okCallback && typeof okCallback === 'function') {
      okCallback(this);
    }

    this.hide();
  }

  show(options) {
    const _options = Object.assign({}, this.defaultOption, options);

    this.setState({
      options: _options,
      isShow: true,
    });

    return this;
  }

  hide() {
    this.setState({
      isShow: false,
    });
  }

  isShow() {
    return this.state.isShow;
  }

  render() {
    const {
      options: {
        type,
        text,
        btnText,
      },
      isShow,
    } = this.state;

    return (
      <CSSTransition
        key="modal"
        classNames="dialog-confirm"
        timeout={300}
        in={isShow}
        mountOnEnter
        unmountOnExit
      >
        <div className="dialog-confirm">
          <div className={`dialog-confirm-${type}`} />
          <p className="dialog-confirm-container">{text}</p>

          <Button
            className="dialog-confirm-btn"
            onClick={this._handleBtnOkOnClick}
          >
            {btnText}
          </Button>
        </div>
      </CSSTransition>
    );
  }
}
