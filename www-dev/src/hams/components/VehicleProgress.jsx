import React from 'react';
import ReactDOM from 'react-dom';

export default class VehicleProgress extends React.Component {
  constructor(props) {
    super(props);
    // console.log(window.location.search.substring(1));
    var searchParams = new URLSearchParams(window.location.search);
    this.voltage = "width:100%";
    for (let p of searchParams) {
      // console.log(p);
      if (p[0] === "voltage") this.voltage = p[1];
    }

    console.log(this.voltage);
  }

  render() {
    return (
      <div className="container" style={{padding: "20px"}}>
        <div className="row align-items-center no-gutters">
          <span className="col-sm-1">Votage: </span>
          <div className="progress col-sm-1" >
            <div className={"progress-bar progress-bar-striped w-" + this.voltage} >
              {this.voltage}%
            </div>
          </div>
          <div className="progress col-sm-10" style={{background: "white"}}>&nbsp;
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<VehicleProgress />, document.getElementById('container'));