import React from 'react';
import ReactDOM from 'react-dom';

const vehicles = [
  {
    id: 1,
    name: "V-001",
    voltage: 110
  },
  {
    id: 2,
    name: "V-002",
    voltage: 220
  },
  {
    id: 3,
    name: "V-003",
    voltage: 300
  }
];

export default class VehicleProgress extends React.Component {
  constructor(props) {
    super(props);

    this.bgStyle = {
      success : "bg-success",
      warning : "bg-warning",
      danger : "bg-danger"
    };

    this.voltageScope = {
      defaultVal: 0,
      maxVal: 300,
      minVal: 0,
      warningVal: 200,
      dangerVal: 240
    };

    this.state = {
      voltage: 0
    };
    
  }

  componentWillMount() {
    var vid = this.getUrlParam("vid", 0);
    var vFiltered = vehicles.filter( function(item) {
      return item.id == vid;
    });
    if (vFiltered.length > 0) 
      this.setState({voltage: vFiltered[0].voltage});
  }

  getUrlParam(key, defaultVal) {
    if (!key) return defaultVal;

    var searchParams = new URLSearchParams(window.location.search);
    if (!searchParams || searchParams.length < 1) return defaultVal;

    for (let p of searchParams) {
      if (p[0] === key) return p[1];
    }

    return defaultVal;
  }


  getVoltagePercentage() {
    var max = this.voltageScope.maxVal;
    return this.state.voltage > max ? 100 : Math.round(this.state.voltage*100/max);
  }

  getVoltageStyle()  {
      return { width: `${this.getVoltagePercentage()}%` };
  }

  getVoltageProgressColor() {
    if (this.state.voltage < this.voltageScope.warningVal) return this.bgStyle.success;
    else if (this.state.voltage > this.voltageScope.dangerVal) return this.bgStyle.danger;
    else return this.bgStyle.warning;
  }


  render() {
    return (
      <div className="container" style={{padding: "20px"}}>
        <div className="row align-items-center no-gutters">
          <span className="col-sm-1">Voltage: </span>
          <div className="progress col-sm-2" >
            <div className={"progress-bar progress-bar-striped " + this.getVoltageProgressColor()} 
              style={this.getVoltageStyle()}>
              {this.state.voltage}V
            </div>
          </div>
          <div className="progress col-sm-9" style={{background: "white"}}>&nbsp;
          </div>
        </div>
      </div>
    );
  }
}


