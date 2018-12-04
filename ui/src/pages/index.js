import React from 'react';
import { connect } from 'react-redux';
import { fetchColors } from '../actions/colors';
import ColorItem from './components/colorItem';

class Page extends React.Component {
  componentDidMount() {
    this.props.fetchColors();
  }

  render() {
    const { colors } = this.props
    return (
      <div>
        { colors.map(color => 
          <ColorItem key={color.name} name={color.name} hex={color.hex} cname={color.cname} />) 
        }
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  const { colors } = state.colorsReducer;
  return {
    colors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchColors: () => {
      dispatch(fetchColors())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);