import React from 'react';
import ReactDOM from 'react-dom';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-deck m-3">
        {this.props.data.map((row, index) => (
        <div className="card m-2">
            <div className="card-block" key={index}>
              <h4 className="card-title text-center">{index}</h4>
              <p className="card-text text-center">{row.name}</p>
              <p className="text-muted text-center">{row.status}</p>
            </div>
        </div>
        ))}
      </div>
    );
  }
}
