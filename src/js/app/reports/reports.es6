import React from 'react'

const REPORT_IDS = ['report-1', 'report-2', 'report-3'];
 
class Reports extends React.Component {
  state = { 
    data: null
  }

  componentDidMount() {
    var defs = [], 
        reportsData = [];

    for(let report of REPORT_IDS) {
      defs.push($.get('repo/reports/'+report+'.json'));
    }

    $.when(...defs).done( (data1, data2, data3) => {
      reportsData.push(data1[0]);
      reportsData.push(data2[0]);
      reportsData.push(data3[0]);

      this.setState({
        data: reportsData
      });
    });
  }

  createReportsList() {
    return this.state.data;
  }

  render() {
    return <div className="content">
      {this.createReportsList()}
    </div>;
  }
}
 
export default Reports