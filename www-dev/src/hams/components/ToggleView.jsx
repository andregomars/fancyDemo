import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import CardsView from './Cards.jsx';
import TableView from './TableSimple.jsx';

class ToggleView extends React.Component {
  constructor(props) {
    super(props);
    this.handleCardsViewToggle = this.handleCardsViewToggle.bind(this);
    this.handleTableViewToggle = this.handleTableViewToggle.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.state = {
      viewComponent: "tableview",
      isRefreshing: false,
      interval: 5000,
      data: []
    };
  }

  componentDidMount() {
    this.getData();
    this.startAutoRefresh();
  }

  componentWillUnmount() {
    this.cancelAutoRefresh();
  }

  startAutoRefresh() {
    this.timerID = setInterval(() => 
      this.getData(), this.state.interval
    );
  }

  cancelAutoRefresh() {
    clearInterval(this.timerID);
  }

  getUrl() {
    let urls = [
      "http://www.mocky.io/v2/589ebc1f270000ab24ed0efe"
      // "http://www.mocky.io/v2/58789d370f0000a71f0d49ed"
      // ,"http://www.mocky.io/v2/587d44fc0f00004e0c5df626"
      // ,"http://www.mocky.io/v2/587d47d50f0000930c5df627"
      // ,"http://www.mocky.io/v2/587d49050f0000aa0c5df629"
      // ,"http://www.mocky.io/v2/587d49960f0000bd0c5df62a"
      ];
    return urls[Math.floor(Math.random()*urls.length)];
  }

  getData() {
    this.setState({isRefreshing: true});
    $.ajax({
      url: this.getUrl(),
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data,
          isRefreshing: false
        });
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({isRefreshing: false});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleCardsViewToggle() {
    this.setState({viewComponent: "cardsview"});
  }

  handleTableViewToggle() {
    this.setState({viewComponent: "tableview"});
  }

  handleRefreshClick() {
    this.getData();
  }

  render() {
    const viewComponent = this.state.viewComponent;
    
    let button = null;
    switch (viewComponent)
    {
      case "tableview":
        button = <CardsViewButton onClick={this.handleCardsViewToggle} />;
        break;
      case "cardsview":
        button = <TableViewButton onClick={this.handleTableViewToggle} />;
        break;
    }

    return (
      <div className="container">
        <div className="row m-3">
          <div className="col text-right">
            <div className="btn-group">
              <button className="btn btn-link" onClick={this.handleRefreshClick}>
                {
                  this.state.isRefreshing ? 
                  (<i className="fa fa-refresh fa-2x fa-spin" />)
                  :
                  (<i className="fa fa-refresh fa-2x" />)
                }
              </button>
              {button} {/* view toggle button in the left */}
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col">
            <ToggledView viewComponent={viewComponent} data={this.state.data}/>
          </div>
        </div>
      </div>
    );
  }
}

function ToggledView(props) {
  switch (props.viewComponent)
  {
    case "cardsview":
      return <CardsView data={props.data} />;
    case "tableview":
      return <TableView data={props.data} />;
  }
}

function TableViewButton(props) {
  return (
    <button className="btn btn-link" onClick={props.onClick}>
      <i className="fa fa-list fa-2x" />
    </button>
  );
}

function CardsViewButton(props) {
  return (
    <button className="btn btn-link" onClick={props.onClick}>
      <i className="fa fa-th-large fa-2x" />
    </button>
  );
}

ReactDOM.render(
  <ToggleView />,
  document.getElementById('fleet')
);
