import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import {Cards} from './TableSimple.jsx';

class ToggleView extends React.Component {
  constructor(props) {
    super(props);
    this.handleCardsViewToggle = this.handleCardsViewToggle.bind(this);
    this.handleTableViewToggle = this.handleTableViewToggle.bind(this);
    this.state = {viewComponent: "tableview"};
  }

  handleCardsViewToggle() {
    this.setState({viewComponent: "cardsview"});
  }

  handleTableViewToggle() {
    this.setState({viewComponent: "tableview"});
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
      <div>
        <ToggledView viewComponent={viewComponent} />
        {button}
      </div>
    );
  }
}

function CardsView(props) {
  return <h1>Cards View</h1>;
}

function TableView(props) {
  return <h1>Table View</h1>;
}

function ToggledView(props) {
  const viewComponent = props.viewComponent;
  switch (viewComponent)
  {
    case "cardsview":
      return <CardsView />;
    case "tableview":
      return <TableView />;
  }
}

function TableViewButton(props) {
  return (
    <button onClick={props.onClick}>
      Table
    </button>
  );
}

function CardsViewButton(props) {
  return (
    <button onClick={props.onClick}>
      Cards
    </button>
  );
}

ReactDOM.render(
  <ToggleView />,
  document.getElementById('container')
);
