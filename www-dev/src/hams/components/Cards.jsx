import React from 'react';
import ReactDOM from 'react-dom';
import Anchor from './VehicleAnchor.jsx';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-deck m-3">
        {this.props.data.map((row, index) => { 
          var cardStyle = "card m-2";
          if (row.status === "Charging") cardStyle = "card m-2 card-inverse card-success";

          return (
            <div className={cardStyle}>
                <div className="card-block" key={index}>
                  <h4 className="card-title text-center"><Anchor vid={row.vid} /></h4>
                  <p className="card-text text-center">{row.soc}%</p>
                  <p className="text-muted text-center">{row.range}mi</p>
                </div>
            </div>
          )}
        )}
      </div>
    );
  }
}
