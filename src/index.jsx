import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      test: 'hogehoge',
    };
  }

  render() {
    return <div>{this.state.test}</div>;
  }
}

ReactDOM.render(<Test />, document.getElementById('root'));
