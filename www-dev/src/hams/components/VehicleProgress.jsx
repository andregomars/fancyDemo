import React from 'react';
import ReactDOM from 'react-dom';


export default class VehicleProgress extends React.Component {
  constructor(props) {
    super(props);

    this.bgStyle = {
      success : "bg-success",
      warning : "bg-warning",
      danger : "bg-danger"
    };

  
  }

  getProcessPercentage() {
    var max = this.props.processScope.maxVal;
    var val = this.props.value;
    return val > max ? 100 : Math.round(val*100/max);
  }

  getProcessStyle()  {
      return { width: `${this.getProcessPercentage()}%`, height: "20px" };
  }

  getProgressColor() {
    var val = this.props.value;
    if (val < this.props.processScope.warningVal) return this.bgStyle.success;
    else if (val > this.props.processScope.dangerVal) return this.bgStyle.danger;
    else return this.bgStyle.warning;
  }


  render() {
    return (
      <div>
        {this.props.label}: 
        <div className="progress" >
          <div className={"progress-bar progress-bar-striped " + 
            this.getProgressColor()} 
            style={this.getProcessStyle()}>
            {this.props.value}{this.props.processScope.unit}
          </div>
        </div>
      </div>
    );
  }
}


