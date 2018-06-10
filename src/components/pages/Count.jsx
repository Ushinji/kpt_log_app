import React from 'react';
import { Link } from 'react-router-dom';

class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <div>ほげえええええええええええ</div>
        <button onClick={this.handleClick}>ぼたん</button>
        <div>{this.state.count}</div>
        <Link to="/projects">ProjectList</Link>
      </div>
    );
  }
}

export default Count;
