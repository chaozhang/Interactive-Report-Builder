import React from 'react'
import Graph from './Graph.es6'
import Loading from '../components/loading.es6'
import Selector from '../components/selector.es6'
import Store from '../store/store.es6'

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

    Store.getDatasetsGraph(dataset + ";" + relationship).done( (data) => {
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

    this.setState({
      data: null
    }, this._fetchData.bind(this, param));
  }

  createFilterControl() {
    return <div className="content filters">
      <label>Filter By:</label>
      <Selector
        list={Store.getDatasetNames()}
        name={"Dataset"}
        ref="dataset"
        onChange={this.onFilterChange.bind(this)}
      />
      <Selector
        list={Store.getDatasetRelations()}
        name={"Relationship"}
        ref="relationship"
        onChange={this.onFilterChange.bind(this)}
      />
    </div>;
  }

  render() {
    let content = <Loading/>;

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