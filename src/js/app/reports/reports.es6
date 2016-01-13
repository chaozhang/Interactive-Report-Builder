import React from 'react'
 
class Reports extends React.Component {
  state = { 
    data: []
  }

  componentDidMount() {
    var def = $.get('repo/reports/report-1.json');

    def.done( function(data){
      alert(data);
    });
  }

  render() {
    return <div className="content">Reports list here ...</div>;
  }
}
 
export default Reports