import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

class ColorItem extends React.Component {
  render() {
    const { name, cname, hex, fontStyle } = this.props;
    const fontColor = fontStyle ? '#000000' : '#FFFFFF';
    return (
      <Grid container  justify="center">
        <Grid item xs={12} sm={9} md={6}>
          <ListItem style={{ backgroundColor: hex, color: fontColor }}>
            {name} {cname}
          </ListItem>
        </Grid>
      </Grid>
    )
  }
}

ColorItem.propTypes = {
  name: PropTypes.string.isRequired,
  cname: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
  fontStyle: PropTypes.number.isRequired
}

export default ColorItem;