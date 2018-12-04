import React from 'react';

export default class ColorItem extends React.Component {
  render() {
    const { name, cname, hex } = this.props;
    return (
      <div style={{ backgroundColor: hex }}>
        {name} {cname}
      </div>
    )
  }
}