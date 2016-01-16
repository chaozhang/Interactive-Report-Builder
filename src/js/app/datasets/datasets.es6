import React from 'react'
import Graph from './Graph.es6'
import Loading from '../components/loading.es6'
import Selector from '../components/selector.es6'

var POSTURL = "http:\/\/158.85.79.185:1337/158.85.79.185:8090/jobs?appName=jobserver&classPath=com.projectx.jobserver.readVisGraph&context=readvisgraph&sync=true";
var DATASETLIST = null;
var RELATIONSHIPLIST = null;

class Datasets extends React.Component {
  state = { 
    data: null
  };

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(param) {
    var dataset = param ? param.dataset : 'all';
    var relationship = param ? param.relationship : 'all';
    var def = $.post(POSTURL, {input: dataset + ";" + relationship});

    if(this.state.data) {
       this.setState({
        data: null
      });     
    }

    def.done( (res) => {
      let data = JSON.parse(res.result);

      if(!DATASETLIST){
        DATASETLIST = data.groups.map((item) => {return item.name;});
      }

      if(!RELATIONSHIPLIST){
        RELATIONSHIPLIST = $.unique(data.links.map((item) => {return item.type;})); 
      }

      this.setState({
        data: data
      });
    });   
  }

  onFilterChange() {
    let param = {
      dataset: this.refs.dataset.state.selected ? this.refs.dataset.state.selected : 'all',
      relationship: this.refs.relationship.state.selected ? this.refs.relationship.state.selected : 'all',
    };

    this._fetchData(param);
  }

  createFilterControl() {
    if(DATASETLIST && RELATIONSHIPLIST) {
      return <div className="content filters">
        <label>Filter By:</label>
        <Selector
          list={DATASETLIST}
          name={"Dataset"}
          ref="dataset"
          onChange={this.onFilterChange.bind(this)}
        />
        <Selector
          list={RELATIONSHIPLIST}
          name={"Relationship"}
          ref="relationship"
          onChange={this.onFilterChange.bind(this)}
        />
      </div>;
    } else {
      return;
    }
  }

  render() {
    var content = <Loading/>;

    if(this.state.data) {
      content = <Graph data={this.state.data}/>;
    }

    return <div className="content datasets">
      {this.createFilterControl()}
      {content}
    </div>;
  }
}

export default Datasets