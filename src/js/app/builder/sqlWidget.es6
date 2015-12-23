import React from 'react'

class SqlWidget extends React.Component {
  generateTable() {
    var headers = [],
        body = [];

    var data = JSON.parse(this.props.data);

    for (let headerColumn of data[0]) {
      headers.push(<th title={headerColumn}>{headerColumn}</th>)
    }

    for (let row of data[1]) {
      let rowView = []
      for (let col of row) {
        rowView.push(<td title={col}>{col}</td>);
      }
      body.push(<tr>{rowView}</tr>);
    }

    return <table>
      <thead>
        <tr className="header">
          {headers}
        </tr>
      </thead>
      <tbody className="data">
        {body}
      </tbody>
    </table>;
  }

  render() {
    return <div className="sql-result">
      <div>
        {this.generateTable()}
      </div>
    </div>
  }
}
 
export default SqlWidget