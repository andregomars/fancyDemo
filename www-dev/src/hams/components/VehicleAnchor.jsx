import React from 'react';

export default class VehicleAnchor extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
	  <a href={"./../vehicle/?vid=" + this.props.vid}>{this.props.vid}</a>
	);
  }
}

// PRD: ./../vehicle/?vid=
// Dev: ./vehicle.html?vid=