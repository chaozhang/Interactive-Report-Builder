import React from 'react'

const DEFAULT_DATA = [
  ['IncidntNum','Category','Descript','DayOfWeek','Date','Time','PdDistrict','Resolution','Address', 'Number of times'],
  [
    [150852050, 'SUSPICIOUS OCC', 'INVESTIGATIVE DETENTION',   'Monday', '09/28/2015', '23:37', 'TARAVAL',  'NONE',   '800 Block of ULLOA ST', 145],
    [150852044, 'DRUG/NARCOTIC',  'POSSESSION OF NARCOTICS',   'Monday', '09/28/2015', '23:30', 'MISSION',  'ARREST', '16TH ST / MISSION ST',  45],
    [56245441,  'LARCENY/THEFT',  'GRAND THEFT OF PROPERTY',   'Monday', '09/28/2015', '23:15', 'SOUTHERN', 'NONE',   '700 Block of HOWARD ST',56],
    [150851977, 'OTHER OFFENSES', 'DRIVERS LICENSE SUSPENDED', 'Monday', '09/28/2015', '23:08', 'SOUTHERN', 'ARREST', '800 Block of BRYANT ST', 17]
  ]
];

class SqlWidget extends React.Component {
  generateTable() {
    var headers = [],
        body = [];

    for (let headerColumn of DEFAULT_DATA[0]) {
      headers.push(<th>{headerColumn}</th>)
    }

    for (let row of DEFAULT_DATA[1]) {
      let rowView = []
      for (let col of row) {
        rowView.push(<td>{col}</td>);
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