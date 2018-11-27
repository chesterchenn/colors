import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Picker from './components/Picker';
import { selected } from '../actions/index'; 

class Page extends React.Component {
  handleChange = (e) => {
    this.props.dispatch(selected(e));
  }

  render() {
    const { selected } = this.props;
    return (
      <div>
        <Picker 
          value={selected}
          onChange={() => this.handleChange}
          options={['colors', 'posts']}
        />
        <div>
          {selected}
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { selected } = state;
  return {
    selected,
  }
}

export default connect(mapStateToProps)(Page);