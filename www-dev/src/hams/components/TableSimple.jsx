import React from 'react';
import ReactDOM from 'react-dom';

function Anchor(props) {
  return (
    <a href={"pages/vehicle.html?vid=" + props.vid}>{props.vid}</a>
  );
}

export default class TableSimple extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((row, index) => (
            <tr key={index}>
              <th><Anchor vid={index} /></th>
              <td>{row.name}</td>
              <td>{row.status}</td>
            </tr>
            ))}
        </tbody>
      </table>
    );
  }
}
