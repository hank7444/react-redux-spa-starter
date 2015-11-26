import React, {Component, PropTypes} from 'react';
import { SubContext } from 'components';

export default class Context extends Component {

  // 設定從parent傳來的context內容, 沒設this.context就吃不到該屬性
  static contextTypes = {
    param: PropTypes.string.isRequired
  };

  static childContextTypes = {
    //param: PropTypes.string,  // 如果要覆寫parent componet傳來的context prop, 這邊也要設定
    paramFromContext: PropTypes.string
  };

  getChildContext() {
    return {
      //param: 'Context modify!', // 腐寫parant component傳來的context prop
      paramFromContext: 'paramFromContext'
    };
  }

  render() {

    {/* inline style 寫法 */}
    const style = {
      backgroundColor: 'orange'
    };
    const {param} = this.context; // eslint-disable-line no-shadow
    return (
      <div style={style}>
        this.context from App: {param}
        <SubContext/>
      </div>
    );
  }
}
