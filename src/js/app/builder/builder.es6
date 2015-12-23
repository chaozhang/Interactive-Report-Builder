import React from 'react'
import ComboEditor from '../components/comboEditor.es6'
import SqlWidget from './sqlWidget.es6'

const DATA_INPUT = {
  type: "input"
}
 
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

  createView() {
    var items = this.state.data,
        result = [],
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
          </div>
      }

      result.push(view);
    });

    return result;
  }

  render() {
    return <div className="content">
      <div className="container">
        {this.createView()}
      </div>
    </div>;
  }
}
 
export default Builder