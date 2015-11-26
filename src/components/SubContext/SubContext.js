import React, {Component, PropTypes} from 'react';

export default class SubContext extends Component {

  // 設定從parent傳來的context內容, 沒設this.context就吃不到該屬性
  static contextTypes = {
    param: PropTypes.string.isRequired,
    paramFromContext: PropTypes.string.isRequired
  };


  render() {

    {/* inline style 寫法 */}
    const style = {
      backgroundColor: 'brown'
    };
    const {param, paramFromContext} = this.context; // eslint-disable-line no-shadow
    return (
      <div style={style}>
        this.context from Context: {param}, another param: {paramFromContext}
      </div>
    );
  }
}
