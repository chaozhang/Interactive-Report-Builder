import React from 'react'
import Store from '../store/store.es6'

const REPORT_IDS = ['report-1', 'report-2', 'report-3'];
 
class Reports extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;      
  }

  state = {
    data: null
  }

  componentDidMount() {
    var defs = [];

    for(let reportId of REPORT_IDS) {
      defs.push(Store.getReport(reportId));
    }

    $.when(...defs).done( (...reports) => {
      this.setState({
        data: reports
      });
    });
  }

  openReport(id) {
    this.context.router.transitionTo('/builder', null, {id: id});
  }

  createReportsList() {
    var items = this.state.data, 
        view = [],
        cols = ['title', 'description', 'author', 'created'];

    for(let i in items) {
      let row = [];

      if(i == 0) {
        let headercols = [];

        for(let col of cols){
          headercols.push(<div className={col}>{col}</div>);
        }

        view.push(<div className="header">{headercols}</div>);
      }


      for(let col of cols){
        row.push(<div className={col}>{items[i][col]}</div>);
      }

      view.push(<div className="row" onClick={this.openReport.bind(this, items[i].id)}>{row}</div>);
    }
    return view;
  }

  render() {
    return <div className="content reports">
      <label>Reports</label>
      {this.createReportsList()}
    </div>;
  }
}

Reports.contextTypes = {
  router: React.PropTypes.object.isRequired
};
 
export default Reports