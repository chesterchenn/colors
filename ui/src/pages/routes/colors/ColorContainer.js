import React from 'react';
import { connect } from 'react-redux';
import { fetchColors } from '../../../redux/actions/colors';
import ColorItem from '../../components/ColorItem';

class ColorContainer extends React.Component {
  componentDidMount() {
    this.props.fetchColors();
  }

  render() {
    const { colors } = this.props
    return (
      <div>
        { colors.list.map(color => 
          <ColorItem 
            key={color.name}
            name={color.name}
            hex={color.hex}
            cname={color.cname}
            fontStyle={color.fontStyle} 
          />) 
        }
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    colors: state.colors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchColors: () => {
      dispatch(fetchColors())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorContainer);