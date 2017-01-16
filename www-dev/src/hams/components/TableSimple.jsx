import React from 'react';
import ReactDOM from 'react-dom';

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
              <th>{index}</th>
              <td>{row.name}</td>
              <td>{row.status}</td>
            </tr>
            ))}
        </tbody>
      </table>
    );
  }
}
