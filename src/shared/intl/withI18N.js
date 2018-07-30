import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const RENDERER_HASH = {
  html: {
    obj: 'formatHTMLMessage',
    comp: FormattedHTMLMessage,
  },
  default: {
    obj: 'formatMessage',
    comp: FormattedMessage,
  },
};

const getRenderer = function getRenderer(type = 'default') {
  return RENDERER_HASH[type];
};

const getDisplayName = function getDisplayName(Comp) {
  return Comp.displayName || Comp.name || 'Component';
};

const with18NFunc = (WrappedComponent) => {
  class with18N extends Component {

    static propTypes = {
      wrappedComponentRef: PropTypes.func,
    };

    static contextTypes = {
      intl: PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);

      this.i18n = this.i18n.bind(this);
    }

    i18n(id, type) {
      const { intl } = this.context;

      const renderer = getRenderer(type);

      if (typeof id === 'string') {
        return intl[renderer.obj]({ id });
      }

      const Render = renderer.comp;
      // otherwise argument muse be an object
      return <Render {...id} />;
    }

    render() {
      const { wrappedComponentRef, ...remainingProps } = this.props;

      return (
        <WrappedComponent ref={wrappedComponentRef} i18n={this.i18n} {...remainingProps} {...this.state} />
      );
    }
  }

  return hoistStatics(with18N, WrappedComponent);
};

export default with18NFunc;
