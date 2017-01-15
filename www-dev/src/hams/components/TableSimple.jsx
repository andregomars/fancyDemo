import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class TableSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      persons: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({persons: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
          {this.state.persons.map((row, index) => (
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

const App = () => (
    <TableSimple url='http://www.mocky.io/v2/58789d370f0000a71f0d49ed' />
);

// Render your table
ReactDOM.render(
  <App />,
  document.getElementById('container')
);