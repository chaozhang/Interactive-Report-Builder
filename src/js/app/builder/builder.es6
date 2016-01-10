import React from 'react'
import ComboEditor from '../components/comboEditor.es6'
import SqlWidget from './sqlWidget.es6'

const DATA_INPUT = {
  type: "input"
}

const EMPTY_REPORT = "Please add a qeury from left pannel";
 
class Builder extends React.Component {
  state = { 
    data: [DATA_INPUT]
  }

  addOutput(index, newItem) {
    var data = this.state.data;
    data[index] = newItem;

    this.setState({
      data: data
    });
  }

  removeItem(e) {
    var index = this.getIndex(e),
        data = this.state.data;
    data.splice(index, 1);

    if (data.length == 0) {
      data.push(DATA_INPUT);
    }

    this.setState({
      data: data
    });
  }

  addNewItem(e) {
    var index = this.getIndex(e),
        data = this.state.data;
    data.splice(index+1, 0, DATA_INPUT);

    this.setState({
      data: data
    });
  }

  getIndex(e) {
    var $section = $(e.target).closest(".section");

    return $(".container .section").index($section[0]);
  }

  createActions() {
    return <div className="actions">
      <button
        className="add-input"
        onClick={this.addNewItem.bind(this)}>
        +
      </button>
      <button
        className="remove"
        onClick={this.removeItem.bind(this)}>
        X
      </button>
    </div>
  }

  createMainView() {
    var items = this.state.data,
        results = [],
        actions = this.createActions();

    items.forEach((item, index) => {
      let view;

      switch (item.type) {
        case 'sql':
          view = <div className="section">
            {actions}
            <SqlWidget
              data={item.data}
            />
          </div>;
          break;
        case 'r':
          view = <div className="section">
            {actions}
            <div>
              <iframe src={item.url}></iframe>
            </div>
          </div>;
          break;
        case 'text':
          view = <div className="section">
            {actions}
            <div>
              {item.text}
            </div>
          </div>;
          break;
        case 'input':
          view = <div className="section">
            {actions}
            <ComboEditor
              onSubmit={this.addOutput.bind(this)}
              index={index}
            />
          </div>;
      }

      results.push(view);
    });

    if(!results.length) {
      results.push(<div>{EMPTY_REPORT}</div>);
    }

    return results;
  }

  render() {
    return <div className="content builder">
      <div className="left-pannel">
      </div>
      <div className="main">
        {this.createMainView()}
      </div>
      <div className="right-pannel">
      </div>
    </div>;
  }
}
 
export default Builder