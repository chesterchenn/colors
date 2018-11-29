import React from 'react';
import { connect } from 'react-redux';
import { fetchColors } from '../actions/colors';

class Page extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchColors());
  }

  render() {
    const { colors } = this.props
    console.log(colors);
    return (
      <div>
        Hello, this is from page.
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { colorsReducer } = state;
  const { colors } = colorsReducer || [];
  return {
    colors
  }
}

export default connect(mapStateToProps)(Page);