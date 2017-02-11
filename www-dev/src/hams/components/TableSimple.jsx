import React from 'react';
import ReactDOM from 'react-dom';
import Anchor from './VehicleAnchor.jsx';

export default class TableSimple extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
              <th>Vehicle#</th>
              <th>SOC</th>
              <th>Status</th>
              <th>Range</th>
              <th>Mileage</th>
              <th>Updated</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((row, index) => (
            <tr key={index}>
              <th><Anchor vid={row.vid} /></th>
              <td>{row.soc}%</td>
              <td>{row.status}</td>
              <td>{row.range}mi</td>
              <td>{row.mileage}</td>
              <td>{row.updated}</td>
              <td><a href="#">Inquiry</a></td>
            </tr>
            ))}
        </tbody>
      </table>
    );
  }
}
