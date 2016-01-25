import React, {Component} from 'react';

/*
export function Enhance(_Component) {

  const Composed = class extends Component {
    constructor() {
      super();
      this.state = { data: 'Enhance!!!' };
    }
    componentDidMount() {
      //this.setState({ data: 'Hello' });
    }
    render() {
      return <_Component {...this.props} data={this.state.data} />;
    }
  };
  return Composed;
}
*/


/*
export default function enhance(ComposedComponent) {
  return class Enhance extends Component {
    constructor() {
      super();
      this.state = { data: 'Enhance!!!' };
    }
    componentDidMount() {
     // this.setState({ data: 'Hello' });
    }
    render() {
      return <ComposedComponent {...this.props} data={this.state.data} />;
    }
  };
}
*/


export default function enhance(params) {

  return function aaa(ComposedComponent) {
    return class Enhance extends Component {
      constructor() {
        super();
        this.state = { data: params };
      }
      componentDidMount() {
       // this.setState({ data: 'Hello' });
      }
      render() {
        return <ComposedComponent {...this.props} data={this.state.data} />;
      }
    };
  };
}

