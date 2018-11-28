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
    const { selectedOption } = this.props;
    return (
      <div>
        <Picker 
          value={selectedOption}
          onChange={(e) => this.handleChange(e)}
          options={['colors', 'posts']}
        />
        <div>
          Hello: {selectedOption}
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { selectedOption } = state;
  return {
    selectedOption,
  }
}

export default connect(mapStateToProps)(Page);